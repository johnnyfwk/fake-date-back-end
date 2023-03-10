const db = require("../../connection");

function dropTablePosts() {
    return db
        .query("DROP TABLE IF EXISTS posts;")
}

const runDropTablePosts = () => {
    return dropTablePosts()
        .then(() => {
            db.end()
        })
}

runDropTablePosts();