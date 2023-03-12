const db = require("../connection");
const { users, posts, comments } = require("../data/development/index");
const format = require("pg-format");

// Drop Tables
function dropTableComments() {
    return db
        .query("DROP TABLE IF EXISTS comments;")
}

function dropTablePosts() {
    return db
        .query("DROP TABLE IF EXISTS posts;")
}

function dropTableUsers() {
    return db
        .query("DROP TABLE IF EXISTS users;")
}
// Drop Tables


// Create Tables
function createTableUsers() {
    const queryString = `
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(20),
            password VARCHAR(20),
            gender VARCHAR(10),
            avatar_url TEXT,
            join_date VARCHAR(50)
        );
    `
    return db
        .query(queryString)
}

function createTablePosts() {
    const queryString = `
        CREATE TABLE posts (
            post_id SERIAL PRIMARY KEY,
            post_date VARCHAR(50),
            title VARCHAR(50),
            city VARCHAR(50),
            gender_of_date VARCHAR(20),
            date VARCHAR(50),
            occasion VARCHAR(50),
            description VARCHAR(300),
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `
    return db
        .query(queryString)
}

function createTableComments() {
    const queryString = `
        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            post_date VARCHAR(50),
            comment VARCHAR(300),
            user_id INT,
            post_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (post_id) REFERENCES posts(post_id)
        );
    `
    return db
        .query(queryString)
}
// Create Tables


// Seed Tables
function seedTableUsers(users) {
    const queryValues = users.map((user) => {
        const userArray = [user.username, user.password, user.gender, user.avatarUrl, user.joinDate];
        return userArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO users
            (username, password, gender, avatar_url, join_date)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

function seedTablePosts(posts) {
    const queryValues = posts.map((post) => {
        const postArray = [post.postDate, post.title, post.city, post.genderOfDate, post.date, post.occasion, post.description, post.userId];
        return postArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO posts
            (post_date, title, city, gender_of_date, date, occasion, description, user_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

function seedTableComments(comments) {
    const queryValues = comments.map((comment) => {
        const commentArray = [comment.postDate, comment.comment, comment.commentOwnerId, comment.postId];
        return commentArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO comments
            (post_date, comment, user_id, post_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}
// Seed Tables


function dropCreateAndSeedAllTables() {
    return dropTableComments()
        .then(() => {
            return dropTablePosts()
        })
        .then(() => {
            return dropTableUsers();
        })
        .then(() => {
            return createTableUsers();
        })
        .then(() => {
            return createTablePosts();
        })
        .then(() => {
            return createTableComments();
        })
        .then(() => {
            return seedTableUsers(users);
        })
        .then(() => {
            return seedTablePosts(posts);
        })
        .then(() => {
            return seedTableComments(comments);
        })
        .then(() => {
            db.end();
        })
}

dropCreateAndSeedAllTables();