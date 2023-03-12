const db = require("../../connection");

function createTableComments() {
    const queryString = `
        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            post_date VARCHAR(50),
            comment VARCHAR(300),
            user_id INT,
            post_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (post_id) REFERENCES posts(post_id)
        );
    `
    return db
        .query(queryString)
}

const runCreateTableComments = () => {
    return createTableComments()
        .then(() => {
            db.end()
        })
}

runCreateTableComments();