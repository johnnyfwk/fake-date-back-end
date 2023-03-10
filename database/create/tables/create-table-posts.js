const db = require("../../connection");

function createTablePosts() {
    const queryString = `
        CREATE TABLE posts (
            post_id SERIAL PRIMARY KEY,
            destination VARCHAR(100),
            arrival_date VARCHAR(20),
            departure_date VARCHAR(20),
            description TEXT,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `
    return db
        .query(queryString)
}

const runCreateTablePosts = () => {
    return createTablePosts()
        .then(() => {
            db.end()
        })
}

runCreateTablePosts();