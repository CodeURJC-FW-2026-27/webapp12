import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as board from './board.js';

const router = express.Router();
export default router;

const upload = multer({ dest: board.UPLOADS_FOLDER })
// Géneros disponibles en el formulario
const GENRES = [
    'Action', 'Adventure', 'Role-playing / RPG', 'Strategy',
    'Fighting', 'Simulation', 'Sport & Driving', 'Puzzle & Rhythm'
];
// Muestra la página de error con la lista de mensajes y un botón de vuelta
function showError(res, errors, backUrl, backText) {

    res.status(400).render('error', { errors, backUrl, backText });
}

// Muestra la página de confirmación con un mensaje y un botón a la siguiente página
function showMessage(res, title, message, nextUrl, nextText) {

    res.render('message', { title, message, nextUrl, nextText });
}
// Comprueba los datos del formulario y devuelve la lista de errores (vacía si todo está bien)
async function validatePost(data,currentId = null) {

    const errors = [];
    const title = data.Title?.trim();
    const price = Number(data.price);

    if (!title) {
        errors.push('El título es obligatorio.');
    } else {
        // El título debe empezar por mayúscula
        if (!/^[A-ZÁÉÍÓÚÑ]/.test(title)) {
            errors.push('El título debe empezar por mayúscula.');
        }
        // El título no puede coincidir con el de OTRO juego
        const existing = await board.getPostByTitle(title);
        if (existing && existing._id.toString() !== currentId) {
            errors.push('Ya existe un juego con ese título.');
        }
    }

    if (!data.company?.trim()) {
        errors.push('La compañía es obligatoria.');
    }

    if (!data.date || Number.isNaN(Date.parse(data.date))) {
        errors.push('La fecha no es válida.');
    }

    if (!data.price?.trim() || !Number.isFinite(price) || price < 0 || price > 1000) {
        errors.push('El precio debe ser un número entre 0 y 1000.');
    }

    return errors;
}
// Number of games shown on each page of the main page
const POSTS_PER_PAGE = 6;

// Genres offered as filter buttons (value is what the form stores in the database)
const GENRES = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'rpg', label: 'Role-playing / RPG' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'Fighting', label: 'Fighting' },
    { value: 'simulation', label: 'Simulation' },
    { value: 'Sport & Driving', label: 'Sport & Driving' },
    { value: 'Puzzle & Rhythm', label: 'Puzzle & Rhythm' }
];

// Builds a main page URL keeping the current search and genre
function buildUrl({ search, genre, page }) {

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (genre) params.set('genre', genre);
    if (page > 1) params.set('page', page);

    const query = params.toString();
    return query ? '/?' + query : '/';
}
// Guarda un juego: sirve tanto para crear (sin id) como para editar (con id)
async function savePost(req, res) {

    const id = req.params.id;
    const isEdit = Boolean(id);
    const formUrl = isEdit ? /post/${id}/edit : '/post/new';

    // Validamos los datos; si hay errores, mostramos la página de error
    const errors = await validatePost(req.body, id);

    if (errors.length > 0) {
        if (req.file) await fs.rm(req.file.path);
        return showError(res, errors, formUrl, 'Volver al formulario');
    }

    const { company, date, price, genre } = req.body;

    // Campos que se guardan en la base de datos
    const fields = {
        Title: req.body.Title.trim(),
        company: company.trim(),
        date: date.trim(),
        price: Number(price),
        ...(genre && { genre })
    };

    // Crear un juego nuevo
    if (!isEdit) {
        if (req.file) fields.imageFilename = req.file.filename;

        const result = await board.addPost(fields);

        return showMessage(res, 'Juego creado', 'El juego ha sido creado correctamente.',
            /post/${result.insertedId}, 'Ver el juego');
    }

    // Editar un juego existente
    const oldPost = await board.getPost(id);

    if (!oldPost) {
        if (req.file) await fs.rm(req.file.path);
        return showError(res, 'El juego no existe.', '/', 'Ir a la página principal');
    }

    // Si se sube una imagen nueva, sustituye a la anterior; si no, se mantiene la actual
    if (req.file) {
        fields.imageFilename = req.file.filename;
        if (oldPost.imageFilename) {
            await fs.rm(board.UPLOADS_FOLDER + '/' + oldPost.imageFilename, { force: true });
        }
    }

    await board.updatePost(id, fields);

    showMessage(res, 'Juego actualizado', 'El juego ha sido actualizado correctamente.',
        /post/${id}, 'Volver al juego');
}
router.get('/', async (req, res) => {

    // Query parameters are optional; ignore anything that is not plain text
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const genre = typeof req.query.genre === 'string' ? req.query.genre.trim() : '';

    const total = await board.countPosts({ search, genre });
    const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

    // Keep the requested page inside the valid range
    const requested = parseInt(req.query.page, 10);
    const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), totalPages) : 1;

    const posts = await board.getPostsPage({
        search,
        genre,
        skip: (page - 1) * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE
    });

    // One link per page, with the current one marked
    const pages = [];
    for (let number = 1; number <= totalPages; number++) {
        pages.push({
            number,
            url: buildUrl({ search, genre, page: number }),
            current: number === page
        });
    }

    // Genre buttons: changing the genre always goes back to page 1
    const genres = GENRES.map(g => ({
        label: g.label,
        url: buildUrl({ search, genre: g.value }),
        active: g.value.toLowerCase() === genre.toLowerCase()
    }));

    res.render('index', {
        posts,
        search,
        genre,
        genres,
        allGenresUrl: buildUrl({ search }),
        allGenresActive: !genre,
        filtered: Boolean(search || genre),
        pages,
        showPagination: totalPages > 1,
        hasPrevious: page > 1,
        previousUrl: buildUrl({ search, genre, page: page - 1 }),
        hasNext: page < totalPages,
        nextUrl: buildUrl({ search, genre, page: page + 1 })
    });
});

router.post('/post/new', upload.single('image'), async (req, res) => {

    // Validamos los datos; si hay errores, mostramos la página de error
    const errors = await validatePost(req.body);

    if (errors.length > 0) {
        // Borramos la imagen subida para no dejar archivos sueltos
        if (req.file) await fs.rm(req.file.path);
        return showError(res, errors, '/New.html', 'Volver al formulario');
    }

    const { company, date, price, genre } = req.body;
    const numericPrice = Number(price);

    let post = {
        Title: req.body.Title.trim(),
        company: company.trim(),
        date: date.trim(),
        price: numericPrice,
        ...(genre && { genre }),
        ...(req.file && { imageFilename: req.file.filename })
    };

    const result = await board.addPost(post);

    res.render('saved_post', { _id: result.insertedId.toString() });

});

router.get('/post/:id', async (req, res) => {

    let post = await board.getPost(req.params.id);

    res.render('show_post', { post });
});

router.post('/post/:id/delete', async (req, res) => {

    let post = await board.deletePost(req.params.id);

    // Si el juego tenía imagen, borramos también el archivo de uploads
    if (post && post.imageFilename) {
        await fs.rm(board.UPLOADS_FOLDER + '/' + post.imageFilename, { force: true });
    }

    showMessage(res, 'Juego eliminado', 'El juego ha sido eliminado correctamente.', '/', 'Ir a la página principal');
});
// Muestra el formulario de juego (vacío al crear, relleno al editar)
function renderForm(res, formTitle, action, post, cancelUrl) {

    const genres = GENRES.map(name => ({ name, selected: name === post.genre }));

    res.render('post_form', { formTitle, action, post, genres, cancelUrl, isEdit: Boolean(post._id) });
}

router.get('/post/:id/image', async (req, res) => {

    let post = await board.getPost(req.params.id);

    res.download(board.UPLOADS_FOLDER + '/' + post.imageFilename);

});
