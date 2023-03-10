const { posts } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTablePosts(posts) {
    const queryValues = posts.map((post) => {
        const postArray = [post.postDate, post.destination, post.arrivalDate, post.departureDate, post.description, post.userId];
        return postArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO posts
            (post_date, destination, arrival_date, departure_date, description, user_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

const runSeedTablePosts = () => {
    return seedTablePosts(posts)
        .then(() => {
            db.end()
        })
}

runSeedTablePosts();