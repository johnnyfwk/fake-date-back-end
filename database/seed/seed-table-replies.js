const { replies } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTableReplies(replies) {
    const queryValues = replies.map((reply) => {
        const replyArray = [reply.postDate, reply.reply, reply.replyOwnerId, reply.postId];
        return replyArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO replies
            (post_date, reply, user_id, post_id)
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