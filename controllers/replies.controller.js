const {
    getAllReplies,
    getAReplyById,
    getAllRepliesByPostId,
    getAllRepliesByUserId,
    postAReply,
    editAReplyById,
    deleteAReplyById,
    deleteAllRepliesByPostId,
    deleteAllRepliesByUserId
} = require("../models/replies.model");

function getReplies(request, response, next) {
    getAllReplies()
        .then((replies) => {
            response.status(200).send({replies});
        })
        .catch((error) => {
            next(error);
        })
}

function getReplyById(request, response, next) {
    getAReplyById(request.params.reply_id)
        .then((reply) => {
            response.status(200).send({reply});
        })
        .catch((error) => {
            next(error);
        })
}

function getRepliesByPostId(request, response, next) {
    getAllRepliesByPostId(request.params.post_id)
        .then((replies) => {
            response.status(200).send({replies});
        })
        .catch((error) => {
            next(error);
        })
}

function getRepliesByUserId(request, response, next) {
    getAllRepliesByUserId(request.params.user_id)
        .then((replies) => {
            response.status(200).send({replies});
        })
        .catch((error) => {
            next(error);
        })
}

function postReply(request, response, next) {
    postAReply(request.body)
        .then((reply) => {
            response.status(201).send({reply});
        })
        .catch((error) => {
            next(error);
        })
}

function editReplyById(request, response, next) {
    editAReplyById(request.params.reply_id, request.body)
        .then((reply) => {
            response.status(200).send({reply});
        })
        .catch((error) => {
            next(error);
        })
}

function deleteReplyById(request, response, next) {
    deleteAReplyById(request.params.reply_id)
        .then((reply) => {
            response.status(204).send({reply});
        })
        .catch((error) => {
            next(error);
        })
}

function deleteRepliesByPostId(request, response, next) {
    deleteAllRepliesByPostId(request.params.post_id)
        .then((replies) => {
            response.status(204).send({replies});
        })
        .catch((error) => {
            next(error);
        })
}

function deleteRepliesByUserId(request, response, next) {
    deleteAllRepliesByUserId(request.params.user_id)
        .then((replies) => {
            response.status(204).send({replies});
        })
        .catch((error) => {
            next(error);
        })
}

module.exports = {
    getReplies,
    getReplyById,
    getRepliesByPostId,
    getRepliesByUserId,
    postReply,
    editReplyById,
    deleteReplyById,
    deleteRepliesByPostId,
    deleteRepliesByUserId
}