const db = require("../database/connection");

function getAllUsers() {
    return db
        .query("SELECT * FROM users;")
        .then((response) => {
            return response.rows;
        })
}

module.exports = {
    getAllUsers
}