import fs from 'node:fs/promises';
import * as board from './board.js';

const DATA_FOLDER = './data';

// We only load the demo data if the database is empty, to avoid overwriting existing data.
const existingGames = await board.countPosts();

if (existingGames === 0) {

    const dataString = await fs.readFile(DATA_FOLDER + '/data.json', 'utf8');
    const posts = JSON.parse(dataString);

    // If there are no games, any standalone reviews don't make sense: we delete them
    await board.deleteReviews();

    // Games are saved first to allow linking each review with its game by title
    const postIds = {};
    for (let post of posts) {
        const result = await board.addPost(post);
        postIds[post.Title] = result.insertedId;
    }

    const reviewsString = await fs.readFile(DATA_FOLDER + '/reviews.json', 'utf8');
    for (let { gameTitle, ...review } of JSON.parse(reviewsString)) {
        await board.addReview({ ...review, postId: postIds[gameTitle] });
    }

    // We copy the images to the uploads folder, creating it if it doesn't exist
    await fs.mkdir(board.UPLOADS_FOLDER, { recursive: true });
    await fs.cp(DATA_FOLDER + '/images', board.UPLOADS_FOLDER, { recursive: true });
    console.log('Demo data loaded');
} else {
    console.log('The database already has data: demo data not loaded');
}