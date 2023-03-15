const express = require("express");
const app = express();
const cors = require("cors");

const {
    getUsers,
    getUserById,
    addUser,
    editUserById,
    deleteUserById
} = require("./controllers/users.controller.js");

const {
    getPosts,
    getPostById,
    getPostsByUserId,
    createPost,
    editPostById,
    deletePostById,
    deletePostsByUserId
} = require("./controllers/posts.controller");

const {
    getReplies,
    getReplyById,
    getRepliesByPostId,
    getRepliesByUserId,
    postReply,
    editReplyById,
    deleteReplyById,
    deleteRepliesByPostId,
    deleteRepliesByUserId
} = require("./controllers/replies.controller");

const {
    getMessages
} = require("./controllers/messages.controller");

const {
    handle404Errors,
    handleCustomErrors,
    handle500Errors
} = require("./controllers/errors.controller");

app.use(cors());

app.use(express.json());

app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUserById);
app.post("/api/users", addUser);
app.patch("/api/users/:user_id", editUserById);
app.delete("/api/users/:user_id", deleteUserById);

app.get("/api/posts", getPosts);
app.get("/api/posts/:post_id", getPostById);
app.get("/api/users/:user_id/posts", getPostsByUserId);
app.post("/api/posts", createPost);
app.patch("/api/posts/:post_id", editPostById);
app.delete("/api/posts/:post_id", deletePostById);
app.delete("/api/users/:user_id/posts", deletePostsByUserId);

app.get("/api/replies", getReplies);
app.get("/api/replies/:reply_id", getReplyById);
app.get("/api/posts/:post_id/replies", getRepliesByPostId);
app.get("/api/users/:user_id/replies", getRepliesByUserId);
app.post("/api/replies", postReply);
app.patch("/api/replies/:reply_id", editReplyById);
app.delete("/api/replies/:reply_id", deleteReplyById);
app.delete("/api/posts/:post_id/replies", deleteRepliesByPostId);
app.delete("/api/users/:user_id/replies", deleteRepliesByUserId);

app.get("/api/messages", getMessages);

app.all("*", handle404Errors);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;