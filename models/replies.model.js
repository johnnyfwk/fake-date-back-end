const db = require("../database/connection");

function getAllReplies() {
    const queryString = `
        SELECT
            replies.reply_id,
            replies.reply_date,
            replies.user_id,
            users.username,
            users.gender,
            users.avatar_url,
            replies.reply,
            replies.post_id,
            posts.post_date,
            posts.title,
            posts.gender_of_date,
            posts.city,
            posts.occasion,
            posts.date,
            posts.description
        FROM replies
        JOIN posts
            ON replies.post_id = posts.post_id
        JOIN users
            ON replies.user_id = users.user_id
        ORDER BY replies.reply_id DESC;
    `
    return db
        .query(queryString)
        .then((response) => {
            return response.rows;
        })
}

function getAReplyById(replyId) {
    if (isNaN(replyId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid reply ID."});
    }

    const queryString = `
        SELECT
            replies.reply_id,
            replies.reply_date,
            replies.user_id,
            users.username,
            users.gender,
            users.avatar_url,
            replies.reply,
            replies.post_id,
            posts.post_date,
            posts.title,
            posts.gender_of_date,
            posts.city,
            posts.occasion,
            posts.date,
            posts.description
        FROM replies
        JOIN posts
            ON replies.post_id = posts.post_id
        JOIN users
            ON replies.user_id = users.user_id
        WHERE replies.reply_id = $1;
    `
    const queryValue = [replyId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Reply does not exist."});
            }
            return response.rows[0];
        })
}

function getAllRepliesByPostId(postId) {
    if (isNaN(postId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid post ID."});
    }

    const queryString = `
        SELECT
            replies.reply_id,
            replies.reply_date,
            replies.user_id,
            users.username,
            users.gender,
            users.avatar_url,
            replies.reply,
            replies.post_id,
            posts.post_date,
            posts.title,
            posts.gender_of_date,
            posts.city,
            posts.occasion,
            posts.date,
            posts.description
        FROM replies
        JOIN posts
            ON replies.post_id = posts.post_id
        JOIN users
            ON replies.user_id = users.user_id
        WHERE replies.post_id = $1
        ORDER BY replies.reply_id DESC;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function getAllRepliesByUserId(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        SELECT
            replies.reply_id,
            replies.reply_date,
            replies.user_id,
            users.username,
            users.gender,
            users.avatar_url,
            replies.reply,
            replies.post_id,
            posts.post_date,
            posts.title,
            posts.gender_of_date,
            posts.city,
            posts.occasion,
            posts.date,
            posts.description
        FROM replies
        JOIN posts
            ON replies.post_id = posts.post_id
        JOIN users
            ON replies.user_id = users.user_id
        WHERE replies.user_id = $1
        ORDER BY replies.reply_id DESC;
    `
    const queryValue = [userId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function postAReply(newReply) {
    const queryString = `
        INSERT INTO replies
            (reply_date, reply, post_id, user_id)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *;
    `
    const queryValues = [newReply.reply_date, newReply.reply, newReply.post_id, newReply.user_id];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            return response.rows[0];
        })
}

function editAReplyById(replyId, updatedReply) {
    if (isNaN(replyId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid reply ID."});
    }

    const queryString = `
        UPDATE replies
        SET
            reply = $1
        WHERE reply_id = $2
        RETURNING *;
    `
    const queryValues = [updatedReply.reply, replyId];

    return db
        .query(queryString, queryValues)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Post or reply does not exist."});
            }
            return response.rows[0];
        })
}

function deleteAReplyById(replyId) {
    if (isNaN(replyId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid reply ID."});
    }

    const queryString = `
        DELETE FROM replies
        WHERE reply_id = $1
        RETURNING *;
    `
    const queryValue = [replyId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            if (response.rowCount === 0) {
                return Promise.reject({status: 404, msg: "Reply does not exist."});
            }
            return response.rows[0];
        })
}

function deleteAllRepliesByPostId(postId) {
    if (isNaN(postId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid post ID."});
    }

    const queryString = `
        DELETE FROM replies
        WHERE post_id = $1
        RETURNING *;
    `
    const queryValue = [postId];

    return db
        .query(queryString, queryValue)
        .then((response) => {
            return response.rows;
        })
}

function deleteAllRepliesByUserId(userId) {
    if (isNaN(userId)) {
        return Promise.reject({status: 400, msg: "Please enter a valid user ID."});
    }

    const queryString = `
        DELETE FROM replies
        WHERE user_id = $1
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
    getAllReplies,
    getAReplyById,
    getAllRepliesByPostId,
    getAllRepliesByUserId,
    postAReply,
    editAReplyById,
    deleteAReplyById,
    deleteAllRepliesByPostId,
    deleteAllRepliesByUserId
}