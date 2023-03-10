const db = require("../connection");
const { users, posts } = require("../data/development/index");
const format = require("pg-format");

function dropTablePosts() {
    return db
        .query("DROP TABLE IF EXISTS posts;")
}

function dropTableUsers() {
    return db
        .query("DROP TABLE IF EXISTS users;")
}

function createTableUsers() {
    const queryString = `
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(20),
            password VARCHAR(20),
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
            destination VARCHAR(100),
            arrival_date VARCHAR(20),
            departure_date VARCHAR(20),
            description TEXT,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `
    return db
        .query(queryString)
}

function seedTableUsers(users) {
    const queryValues = users.map((user) => {
        const userArray = [user.username, user.password, user.avatarUrl, user.joinDate];
        return userArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO users
            (username, password, avatar_url, join_date)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

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

function dropCreateAndSeedAllTables() {
    return dropTablePosts()
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
            return seedTableUsers(users);
        })
        .then(() => {
            return seedTablePosts(posts);
        })
        .then(() => {
            db.end();
        })
}

dropCreateAndSeedAllTables();