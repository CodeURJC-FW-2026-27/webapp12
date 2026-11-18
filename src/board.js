import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('board');
const posts = db.collection('posts');

const reviews = db.collection('reviews');

export const UPLOADS_FOLDER = './uploads';

export async function addPost(post) {

    return await posts.insertOne(post);
}

export async function deletePost(id){

    return await posts.findOneAndDelete({ _id: new ObjectId(id) });
}

export async function deletePosts(){

    return await posts.deleteMany();
}

export async function getPosts(){

    return await posts.find().toArray();
}

export async function getPost(id){

    return await posts.findOne({ _id: new ObjectId(id) });
}
//Searches for a game by its title (case-insensitive, ignoring surrounding spaces)
//Returns null if it doesn't exist
export async function getPostByTitle(title) {

    return await posts.findOne({ Title: title });
}
function buildFilter({ search, genre } = {}) {

    const filter = {};
    const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (search) {
        // Partial match on the title
        filter.Title = { $regex: escape(search), $options: 'i' };
    }
    if (genre) {
        // Exact match on the genre, ignoring case and surrounding spaces
        filter.genre = { $regex: '^\\s*' + escape(genre) + '\\s*$', $options: 'i' };
    }
    return filter;
}

// Counts the games that match the search and genre filters
export async function countPosts(options) {

    return await posts.countDocuments(buildFilter(options));
}

// Returns one page of games that match the filters (skip/limit do the pagination)
export async function getPostsPage({ search, genre, skip = 0, limit = 6 } = {}) {

    return await posts.find(buildFilter({ search, genre }))
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();
}
// Updates the specified fields of a game (the other fields are not touched)
export async function updatePost(id, fields) {

    return await posts.updateOne({ _id: new ObjectId(id) }, { $set: fields });
}

// ---------- Reviews (secondary entity). Each review is linked to a game by "postId" ----------

export async function addReview(review) {

    return await reviews.insertOne(review);
}

// Returns all the reviews of one game
export async function getReviewsByPost(postId) {

    return await reviews.find({ postId: new ObjectId(postId) }).sort({ _id: 1 }).toArray();
}

// Looks for a review of the same game with the same source
export async function getReviewBySource(postId, source) {

    return await reviews.findOne({ postId: new ObjectId(postId), source });
}

export async function getReview(id) {

    return await reviews.findOne({ _id: new ObjectId(id) });
}

export async function deleteReview(id) {

    return await reviews.findOneAndDelete({ _id: new ObjectId(id) });
}
// Updates the given fields of a review (the other fields are not touched)
export async function updateReview(id, fields) {

    return await reviews.updateOne({ _id: new ObjectId(id) }, { $set: fields });
}

export async function deleteReviews() {

    return await reviews.deleteMany();
}

// Deletes all the reviews of a game and returns them (to be able to remove their images)
export async function deleteReviewsByPost(postId) {

    const postReviews = await getReviewsByPost(postId);
    await reviews.deleteMany({ postId: new ObjectId(postId) });
    return postReviews;
}