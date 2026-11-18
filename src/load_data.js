import fs from 'node:fs/promises';
import * as board from './board.js';

const DATA_FOLDER = './data';

// Solo cargamos los datos de ejemplo si la base de datos está vacía
const existingGames = await board.countPosts();

if (existingGames === 0) {

    const dataString = await fs.readFile(DATA_FOLDER + '/data.json', 'utf8');
    const posts = JSON.parse(dataString);

    // Si no hay juegos, cualquier reseña suelta no tiene sentido: la borramos
    await board.deleteReviews();

    // Los juegos se guardan primero para poder vincular cada reseña con su juego por el título
    const postIds = {};
    for (let post of posts) {
        const result = await board.addPost(post);
        postIds[post.Title] = result.insertedId;
    }

    const reviewsString = await fs.readFile(DATA_FOLDER + '/reviews.json', 'utf8');
    for (let { gameTitle, ...review } of JSON.parse(reviewsString)) {
        await board.addReview({ ...review, postId: postIds[gameTitle] });
    }

    // Copiamos las imágenes de ejemplo SIN borrar lo que ya hubiera en uploads
    await fs.mkdir(board.UPLOADS_FOLDER, { recursive: true });
    await fs.cp(DATA_FOLDER + '/images', UPLOADS_FOLDER, { recursive: true });

    console.log('Demo data loaded');
} else {
    console.log('The database already has data: demo data not loaded');
}