const db = require("../database/connection");

function getAllPosts() {
    const queryString = `
        SELECT
            posts.post_id,
            posts.post_date,
            posts.destination,
            posts.arrival_date,
            posts.departure_date,
            posts.description,
            posts.user_id,
            users.username,
            users.avatar_url
        FROM posts
        JOIN users
        ON posts.user_id = users.user_id
        ORDER BY post_id DESC;
    `
    return db
        .query(queryString)
        .then((response) => {
            return response.rows;
        })
}

function getAPostById(postId) {
    if (isNaN(postId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid post ID."});
    }

    const queryString = `
        SELECT
            posts.post_id,
            posts.post_date,
            posts.destination,
            posts.arrival_date,
            posts.departure_date,
            posts.description,
            posts.user_id,
            users.username,
            users.avatar_url
        FROM posts
        JOIN users
        ON posts.user_id = users.user_id
        WHERE post_id = $1;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Post does not exist."});
            }
            return response.rows[0];
        })
}

function getAllPostsByUserId(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        SELECT
            posts.post_id,
            posts.post_date,
            posts.destination,
            posts.arrival_date,
            posts.departure_date,
            posts.description,
            posts.user_id,
            users.username,
            users.avatar_url
        FROM posts
        JOIN users
        ON posts.user_id = users.user_id
        WHERE posts.user_id = $1
        ORDER BY post_id DESC;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "User does not exist or user has not made any posts."});
            }
            return response.rows;
        })
}

function createAPost(newPost) {
    const queryString = `
        INSERT INTO posts
            (post_date, destination, arrival_date, departure_date, description, user_id)
        VALUES
            ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `
    const queryValues = [newPost.post_date, newPost.destination, newPost.arrival_date, newPost.departure_date, newPost.description, newPost.user_id];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editAPostById(postId, postsNewInfo) {
    if (isNaN(postId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid post ID."});
    }

    const queryString = `
        UPDATE posts
        SET
            destination = $1,
            arrival_date = $2,
            departure_date = $3,
            description = $4
        WHERE post_id = $5
        RETURNING *;
    `
    const queryValues = [postsNewInfo.destination, postsNewInfo.arrival_date, postsNewInfo.departure_date, postsNewInfo.description, postId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Post does not exist."});
            }
            return response.rows[0];
        })
}

function deleteAPostById(postId) {
    if (isNaN(postId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid post ID."});
    }

    const queryString = `
        DELETE FROM posts
        WHERE post_id = $1
        RETURNING *;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Post does not exist."});
            }
            return response.rows[0];
        })
}

function deleteAllPostsByUserId(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        DELETE FROM posts
        WHERE user_id = $1
        RETURNING *;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "User does not exist."});
            }
            return response.rows[0];
        })
}

module.exports = {
    getAllPosts,
    getAPostById,
    getAllPostsByUserId,
    createAPost,
    editAPostById,
    deleteAPostById,
    deleteAllPostsByUserId
}