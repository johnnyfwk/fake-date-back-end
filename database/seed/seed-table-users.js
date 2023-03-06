const { users } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

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

const runSeedTableUsers = () => {
    return seedTableUsers(users)
        .then(() => {
            db.end()
        })
}

runSeedTableUsers();