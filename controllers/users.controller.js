const {
    getAllUsers,
    getAUserById,
    addAUser,
    editAUserById,
    deleteAUserById
} = require("../models/users.model.js");

function getUsers(request, response, next) {
    getAllUsers()
        .then((users) => {
            response.status(200).send({users});
        })
        .catch((error) => {
            next(error);
        })
}

function getUserById(request, response, next) {
    getAUserById(request.params.user_id)
        .then((user) => {
            response.status(200).send({user});
        })
        .catch((error) => {
            next(error);
        })
}

function addUser(request, response, next) {
    addAUser(request.body)
        .then((user) => {
            response.status(201).send({user});
        })
        .catch((error) => {
            next(error);
        })
}

function editUserById(request, response, next) {
    editAUserById(request.params.user_id, request.body)
        .then((user) => {
            response.status(200).send({user});
        })
        .catch((error) => {
            next(error);
        })
}

function deleteUserById(request, response, next) {
    deleteAUserById(request.params.user_id)
        .then((user) => {
            response.status(204).send({msg: "User has been deleted."});
        })
        .catch((error) => {
            next(error);
        })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
}