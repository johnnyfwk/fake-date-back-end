const db = require("../../connection");

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

const runCreateTableReplies = () => {
    return createTableReplies()
        .then(() => {
            db.end()
        })
}

runCreateTableReplies();