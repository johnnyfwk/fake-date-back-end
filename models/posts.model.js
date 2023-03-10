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

module.exports = {
    getAllPosts
}