import fs from 'node:fs/promises';
import * as board from './board.js';

const UPLOADS_FOLDER = './uploads';
const DATA_FOLDER = './data';

let dataFile = 'data.json';

const dataString = await fs.readFile(DATA_FOLDER + '/' + dataFile, 'utf8');

const posts = JSON.parse(dataString);

await board.deletePosts();
await board.deleteReviews();

// Los juegos se guardan primero para poder vincular cada reseña con su juego por el título
const postIds = {};
for(let post of posts){
    const result = await board.addPost(post);
    postIds[post.Title] = result.insertedId;
}

const reviewsString = await fs.readFile(DATA_FOLDER + '/reviews.json', 'utf8');
for(let { gameTitle, ...review } of JSON.parse(reviewsString)){
    await board.addReview({ ...review, postId: postIds[gameTitle] });
}

await fs.rm(UPLOADS_FOLDER, { recursive: true, force: true });
await fs.mkdir(UPLOADS_FOLDER);
await fs.cp(DATA_FOLDER + '/images', UPLOADS_FOLDER, { recursive: true });

console.log('Demo data loaded');