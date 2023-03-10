const {
    getAllPosts,
    getAPostById,
    getAllPostsByUserId,
    createAPost,
    editAPostById,
    deleteAPostById,
    deleteAllPostsByUserId
} = require("../models/posts.model");

function getPosts(request, response, next) {
    getAllPosts()
        .then((posts) => {
            response.status(200).send({posts});
        })
        .catch((error) => {
            next(error);
        })
}

function getPostById(request, response, next) {
    getAPostById(request.params.post_id)
        .then((post) => {
            response.status(200).send({post});
        })
        .catch((error) => {
            next(error);
        })
}

function getPostsByUserId(request, response, next) {
    getAllPostsByUserId(request.params.user_id)
        .then((posts) => {
            response.status(200).send({posts});
        })
        .catch((error) => {
            next(error);
        })
}

function createPost(request, response, next) {
    createAPost(request.body)
        .then((post) => {
            response.status(201).send({post});
        })
        .catch((error) => {
            next(error);
        })
}

function editPostById(request, response, next) {
    editAPostById(request.params.post_id, request.body)
        .then((post) => {
            response.status(200).send({post});
        })
        .catch((error) => {
            next(error);
        })
}

function deletePostById(request, response, next) {
    deleteAPostById(request.params.post_id)
        .then((post) => {
            response.status(204).send({msg: "Post has been deleted."});
        })
        .catch((error) => {
            next(error);
        })
}

function deletePostsByUserId(request, response, next) {
    deleteAllPostsByUserId(request.params.user_id)
        .then((posts) => {
            response.status(204).send({msg: "Posts have been deleted."});
        })
        .catch((error) => {
            next(error);
        })
}

module.exports = {
    getPosts,
    getPostById,
    getPostsByUserId,
    createPost,
    editPostById,
    deletePostById,
    deletePostsByUserId
}