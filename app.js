const express = require("express");
const app = express();

app.use(express.json());

const {
    getUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
} = require("./controllers/users.controller.js");

const {
    handle404Errors,
    handleCustomErrors,
    handle500Errors
} = require("./controllers/errors.controller");

app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUserById);
app.post("/api/users", addUser);
app.patch("/api/users/:user_id", editUserById);
app.delete("/api/users/:user_id", deleteUserById);

app.all("*", handle404Errors);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;