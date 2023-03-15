const db = require("../database/connection");

function getAllMessages() {
    const queryString = `
        SELECT *
        FROM messages
        ORDER BY message_id ASC;
    `
    return db
        .query(queryString)
        .then((response) => {
            return response.rows;
        })
}

module.exports = {
    getAllMessages
}