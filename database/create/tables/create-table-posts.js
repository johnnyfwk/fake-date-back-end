const db = require("../../connection");

function createTablePosts() {
    const queryString = `
        CREATE TABLE posts (
            post_id SERIAL PRIMARY KEY,
            post_date VARCHAR(50),
            city VARCHAR(50),
            gender_of_date VARCHAR(20),
            date VARCHAR(50),
            occasion VARCHAR(50),
            description VARCHAR(300),
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