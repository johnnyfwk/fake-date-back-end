const {
    getAllUsers
} = require("../models/users.model.js");

function getUsers(request, response, next) {
    getAllUsers()
        .then((users) => {
            response.status(200).send( {users} );
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = {
    getUsers
}