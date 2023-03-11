const db = require("../database/connection");

function getAllUsers() {
    const queryString = `
        SELECT *
        FROM users
        ORDER BY user_id DESC;
    `
    return db
        .query(queryString)
        .then((response) => {
            return response.rows;
        })
}

function getAUserById(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        SELECT *
        FROM users
        WHERE user_id = $1;
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

function addAUser(newUser) {
    const queryString = `
        INSERT INTO users
            (username, password, gender, avatar_url, join_date)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING *;
    `
    const queryValues = [newUser.username, newUser.password, newUser.gender, newUser.avatar_url, newUser.join_date];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editAUserById(userId, usersNewInfo) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        UPDATE users
        SET
            password = $1,
            avatar_url = $2
        WHERE user_id = $3
        RETURNING *;
    `
    const queryValues = [usersNewInfo.password, usersNewInfo.avatar_url, userId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "User does not exist."});
            }
            return response.rows[0];
        })
}

function deleteAUserById(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        DELETE FROM users
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
    getAllUsers,
    getAUserById,
    addAUser,
    editAUserById,
    deleteAUserById
}