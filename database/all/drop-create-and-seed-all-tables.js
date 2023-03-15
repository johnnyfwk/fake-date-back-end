const db = require("../connection");
const { users, posts, replies, messages } = require("../data/development/index");
const format = require("pg-format");

// Drop Tables
function dropTableMessages() {
    return db
        .query("DROP TABLE IF EXISTS messages;")
}

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
            post_updated VARCHAR(50),
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
            reply_date VARCHAR(50),
            reply VARCHAR(300),
            post_id INT,
            user_id INT,
            FOREIGN KEY (post_id) REFERENCES posts(post_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `
    return db
        .query(queryString)
}

function createTableMessages() {
    const queryString = `
        CREATE TABLE messages (
            message_id SERIAL PRIMARY KEY,
            message_date VARCHAR(50),
            message TEXT,
            sender_user_id INT,
            sender_username VARCHAR(20),
            sender_avatar_url TEXT,
            receiver_user_id INT,
            receiver_username VARCHAR(20),
            receiver_avatar_url TEXT,
            FOREIGN KEY (sender_user_id) REFERENCES users(user_id),
            FOREIGN KEY (receiver_user_id) REFERENCES users(user_id)
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

function seedTableReplies(replies) {
    const queryValues = replies.map((reply) => {
        const replyArray = [reply.replyDate, reply.reply, reply.postId, reply.replyOwnerId];
        return replyArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO replies
            (reply_date, reply, post_id, user_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

function seedTableMessages(messages) {
    const queryValues = messages.map((message) => {
        const messageArray = [message.messageDate, message.message, message.senderUserId, message.senderUsername, message.senderAvatarUrl, message.receiverUserId, message.receiverUsername, message.receiverAvatarUrl];
        return messageArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO messages
            (message_date, message, sender_user_id, sender_username, sender_avatar_url, receiver_user_id, receiver_username, receiver_avatar_url)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}
// Seed Tables


function dropCreateAndSeedAllTables() {
    return dropTableMessages() 
        .then(() => {
            return dropTableReplies();
        })   
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
            return createTableMessages();
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
            return seedTableMessages(messages);
        })
        .then(() => {
            db.end();
        })
}

dropCreateAndSeedAllTables();