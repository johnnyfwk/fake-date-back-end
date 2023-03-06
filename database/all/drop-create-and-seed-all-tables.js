const db = require("../connection");
const { users } = require("../data/development/index");
const format = require("pg-format");

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
            join_date VARCHAR(40)
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

function dropCreateAndSeedAllTables() {
    return dropTableUsers()
        .then(() => {
            return createTableUsers();
        })
        .then(() => {
            return seedTableUsers(users);
        })
        .then(() => {
            db.end();
        })
}

dropCreateAndSeedAllTables();