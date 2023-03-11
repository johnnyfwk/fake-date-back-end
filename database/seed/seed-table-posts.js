const { posts } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTablePosts(posts) {
    const queryValues = posts.map((post) => {
        const postArray = [post.postDate, post.city, post.gender, post.date, post.occasion, post.description, post.userId];
        return postArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO posts
            (post_date, city, gender, date, occasion, description, user_id)
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