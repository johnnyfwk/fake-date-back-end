const db = require("../../connection");

function dropTableUsers() {
    return db
        .query("DROP TABLE IF EXISTS users;")
}

const runDropTableUsers = () => {
    return dropTableUsers()
        .then(() => {
            db.end()
        })
}

runDropTableUsers();