const db = require("../database/connection");

function getAllPosts() {
    const queryString = `
        SELECT *
        FROM posts
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