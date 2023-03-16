const {
    getAllMessages,
    getAMessageById,
    getAllMessagesByUserId,
    sendAMessage,
    editAMessage,
    deleteAMessageById,
    deleteAllMessagesByUserId
} = require("../models/messages.model");

function getMessages(request, response, next) {
    getAllMessages()
        .then((messages) => {
            response.status(200).send({messages});
        })
        .catch((error) => {
            next(error);
        })
}

function getMessageById(request, response, next) {
    getAMessageById(request.params.message_id)
        .then((message) => {
            response.status(200).send({message});
        })
        .catch((error) => {
            next(error);
        })
}

function getMessagesByUserId(request, response, next) {
    getAllMessagesByUserId(request.params.user_id)
        .then((messages) => {
            response.status(200).send({messages})
        })
        .catch((error) => {
            next(error);
        })
}

function sendMessage(request, response, next) {
    sendAMessage(request.body)
        .then((message) => {
            response.status(201).send({message})
        })
        .catch((error) => {
            next(error);
        })
}

function editMessage(request, response, next) {
    editAMessage(request.params.message_id, request.body)
        .then((message) => {
            response.status(200).send({message});
        })
        .catch((error) => {
            next(error);
        })
}

function deleteMessageById(request, response, next) {
    deleteAMessageById(request.params.message_id)
        .then((message) => {
            response.status(204).send({message});
        })
        .catch((error) => {
            next(error);
        })
}

function deleteMessagesByUserId(request, response, next) {
    deleteAllMessagesByUserId(request.params.user_id)
        .then((messages) => {
            response.status(204).send({messages});
        })
        .catch((error) => {
            next(error);
        })
}

module.exports = {
    getMessages,
    getMessageById,
    getMessagesByUserId,
    sendMessage,
    editMessage,
    deleteMessageById,
    deleteMessagesByUserId
}