import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as board from './board.js';

const router = express.Router();
export default router;

const upload = multer({ dest: board.UPLOADS_FOLDER })

router.get('/', async (req, res) => {

    let posts = await board.getPosts();

    res.render('index', { posts });
});

router.post('/post/new', upload.single('image'), async (req, res) => {

    const title = req.body.Title;
    const { company, date, price, genre } = req.body;
    const numericPrice = Number(price);

    if (!title?.trim() || !company?.trim() || !date?.trim() || !price?.trim() || !Number.isFinite(numericPrice)) {
        return res.status(400).send('Missing or invalid required post fields.');
    }

    let post = {
        Title: title.trim(),
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

router.get('/post/:id/delete', async (req, res) => {

    let post = await board.deletePost(req.params.id);

    if (post && post.imageFilename) {
        await fs.rm(board.UPLOADS_FOLDER + '/' + post.imageFilename);
    }

    res.render('deleted_post');
});

router.get('/post/:id/image', async (req, res) => {

    let post = await board.getPost(req.params.id);

    res.download(board.UPLOADS_FOLDER + '/' + post.imageFilename);

});
