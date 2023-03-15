const db = require("../../connection");

function createTableMessages() {
    const queryString = `
        CREATE TABLE messages (
            message_id SERIAL PRIMARY KEY,
            message_date VARCHAR(50),
            message TEXT,
            sender_user_id INT,
            receiver_user_id INT,
            FOREIGN KEY (sender_user_id) REFERENCES users(user_id),
            FOREIGN KEY (receiver_user_id) REFERENCES users(user_id)
        );
    `
    return db
        .query(queryString)
}

const runCreateTableMessages = () => {
    return createTableMessages()
        .then(() => {
            db.end()
        })
}

runCreateTableMessages();