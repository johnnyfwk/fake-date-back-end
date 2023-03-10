const {
    getAllPosts
} = require("../models/posts.model");

function getPosts(request, response, next) {
    getAllPosts()
        .then((posts) => {
            response.status(200).send( {posts} );
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
}

module.exports = {
    getPosts
}