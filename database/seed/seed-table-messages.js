const { messages } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTableMessages(messages) {
    const queryValues = messages.map((message) => {
        const messageArray = [message.messageDate, message.message, message.senderUserId, message.senderUsername, message.senderAvatarUrl, message.receiverUserId, message.receiverUsername, message.receiverAvatarUrl];
        return messageArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO messages
            (message_date, message, sender_user_id, sender_username, sender_avatar_url, receiver_user_id, receiver_username, receiver_avatar_url)
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