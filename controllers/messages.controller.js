const {
    getAllMessages
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

module.exports = {
    getMessages
}