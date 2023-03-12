const db = require("../../connection");

function createTableReplies() {
    const queryString = `
        CREATE TABLE replies (
            reply_id SERIAL PRIMARY KEY,
            post_date VARCHAR(50),
            reply VARCHAR(300),
            user_id INT,
            post_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (post_id) REFERENCES posts(post_id)
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