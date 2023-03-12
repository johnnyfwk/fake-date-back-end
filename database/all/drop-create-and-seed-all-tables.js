const db = require("../connection");
const { users, posts, replies } = require("../data/development/index");
const format = require("pg-format");

// Drop Tables
function dropTableReplies() {
    return db
        .query("DROP TABLE IF EXISTS replies;")
}

function dropTablePosts() {
    return db
        .query("DROP TABLE IF EXISTS posts;")
}

function dropTableUsers() {
    return db
        .query("DROP TABLE IF EXISTS users cascade;")
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

function createTableReplies() {
    const queryString = `
        CREATE TABLE replies (
            reply_id SERIAL PRIMARY KEY,
            post_date VARCHAR(50),
            reply VARCHAR(300),
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

function seedTableReplies(replies) {
    const queryValues = replies.map((reply) => {
        const replyArray = [reply.postDate, reply.reply, reply.replyOwnerId, reply.postId];
        return replyArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO replies
            (post_date, reply, user_id, post_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}
// Seed Tables


function dropCreateAndSeedAllTables() {
    return dropTableReplies()    
        .then(() => {
            return dropTablePosts();
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
            return createTableReplies();
        })
        .then(() => {
            return seedTableUsers(users);
        })
        .then(() => {
            return seedTablePosts(posts);
        })
        .then(() => {
            return seedTableReplies(replies);
        })
        .then(() => {
            db.end();
        })
}

dropCreateAndSeedAllTables();