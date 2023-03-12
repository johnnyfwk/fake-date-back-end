const { replies } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTableReplies(replies) {
    const queryValues = replies.map((reply) => {
        const replyArray = [reply.replyDate, reply.reply, reply.postId, reply.replyOwnerId];
        return replyArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO replies
            (reply_date, reply, post_id, user_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

const runSeedTableReplies = () => {
    return seedTableReplies(replies)
        .then(() => {
            db.end()
        })
}

runSeedTableReplies();