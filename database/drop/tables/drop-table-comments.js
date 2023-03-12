const db = require("../../connection");

function dropTableComments() {
    return db
        .query("DROP TABLE IF EXISTS comments;")
}

const runDropTableComments = () => {
    return dropTableComments()
        .then(() => {
            db.end()
        })
}

runDropTableComments();