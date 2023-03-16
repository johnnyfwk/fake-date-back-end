const db = require("../database/connection");

function getAllMessages() {
    const queryString = `
        SELECT *
        FROM messages
        ORDER BY message_id DESC;
    `
    return db
        .query(queryString)
        .then((response) => {
            return response.rows;
        })
}

function getAMessageById(messageId) {
    if (isNaN(messageId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid message ID."});
    }

    const queryString = `
        SELECT *
        FROM messages
        WHERE message_id = $1;
    `
    const queryValue = [messageId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Message does not exist."});
            }
            return response.rows[0];
        })
}

function getAllMessagesByUserIdDesc(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        SELECT *
        FROM messages
        WHERE
            sender_user_id = $1
        OR
            receiver_user_id = $1
        ORDER BY message_id DESC;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function getAllMessagesByUserIdAsc(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        SELECT *
        FROM messages
        WHERE
            sender_user_id = $1
        OR
            receiver_user_id = $1
        ORDER BY message_id ASC;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function sendAMessage(newMessage) {
    const queryString = `
        INSERT INTO messages
            (message_date, message, sender_user_id, sender_username, sender_avatar_url, receiver_user_id, receiver_username, receiver_avatar_url)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `
    
    const queryValues = [
        newMessage.message_date,
        newMessage.message,
        newMessage.sender_user_id,
        newMessage.sender_username,
        newMessage.sender_avatar_url,
        newMessage.receiver_user_id,
        newMessage.receiver_username,
        newMessage.receiver_avatar_url
    ];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editAMessage(messageId, editedMessage) {
    if (isNaN(messageId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid message ID."});
    }

    const queryString = `
        UPDATE messages
        SET message = $1
        WHERE message_id = $2
        RETURNING *;
    `
    const queryValues = [editedMessage.message, messageId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function deleteAMessageById(messageId) {
    if (isNaN(messageId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid message ID."});
    }

    const queryString = `
        DELETE FROM messages
        WHERE message_id = $1
        RETURNING *;
    `
    const queryValue = [messageId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows[0];
        })
}

function deleteAllMessagesByUserId(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        DELETE FROM messages
        WHERE
            sender_user_id = $1
        OR
            receiver_user_id = $1
        RETURNING *;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

module.exports = {
    getAllMessages,
    getAMessageById,
    getAllMessagesByUserIdDesc,
    getAllMessagesByUserIdAsc,
    sendAMessage,
    editAMessage,
    deleteAMessageById,
    deleteAllMessagesByUserId
}