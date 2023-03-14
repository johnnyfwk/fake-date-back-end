const { posts } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTablePosts(posts) {
    const queryValues = posts.map((post) => {
        const postArray = [post.postDate, post.postUpdated, post.title, post.city, post.genderOfDate, post.date, post.occasion, post.description, post.userId];
        return postArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO posts
            (post_date, post_updated, title, city, gender_of_date, date, occasion, description, user_id)
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