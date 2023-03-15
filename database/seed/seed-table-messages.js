const { messages } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTableMessages(messages) {
    const queryValues = messages.map((message) => {
        const messageArray = [message.messageDate, message.message, message.senderUserId, message.receiverUserId];
        return messageArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO messages
            (message_date, message, sender_user_id, receiver_user_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

const runSeedTableMessages = () => {
    return seedTableMessages(messages)
        .then(() => {
            db.end()
        })
}

runSeedTableMessages();