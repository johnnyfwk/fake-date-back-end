const db = require("../../connection");

function dropTableMessages() {
    return db
        .query("DROP TABLE IF EXISTS messages;")
}

const runDropTableMessages = () => {
    return dropTableMessages()
        .then(() => {
            db.end()
        })
}

runDropTableMessages();