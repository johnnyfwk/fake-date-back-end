const db = require("../../connection");

function dropTableUsers() {
    return db
        .query("DROP TABLE IF EXISTS users cascade;")
}

const runDropTableUsers = () => {
    return dropTableUsers()
        .then(() => {
            db.end()
        })
}

runDropTableUsers();