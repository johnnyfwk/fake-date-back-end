const db = require("../../connection");

function dropTableReplies() {
    return db
        .query("DROP TABLE IF EXISTS replies;")
}

const runDropTableReplies = () => {
    return dropTableReplies()
        .then(() => {
            db.end()
        })
}

runDropTableReplies();