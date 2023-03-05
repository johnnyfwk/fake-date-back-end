const express = require("express");
const app = express();

const {
    getUsers
} = require("./controllers/users.controller.js");

app.get('/api/users', getUsers);

module.exports = app;