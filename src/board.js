import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
export default router;

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('board');
const posts = db.collection('posts');

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
// Busca en la base de datos un juego con exactamente ese título.
// Devuelve el juego si existe, o null si no existe 
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