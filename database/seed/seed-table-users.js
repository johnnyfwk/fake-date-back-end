const { users } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

console.log(users, "<----- users")

function seedTableUsers(users) {
    const queryValues = users.map((user) => {
        const userArray = [user.username, user.password, user.avatarUrl];
        return userArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO users
            (username, password, avatar_url)
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