const { comments } = require("../data/development/index");
const db = require("../connection");
const format = require("pg-format");

function seedTableComments(comments) {
    const queryValues = comments.map((comment) => {
        const commentArray = [comment.postDate, comment.comment, comment.commentOwnerId, comment.postId];
        return commentArray;
    })

    const queryStringAndValues = format(`
        INSERT INTO comments
            (post_date, comment, user_id, post_id)
        VALUES
            %L
        RETURNING *;
    `, queryValues);

    return db
        .query(queryStringAndValues)
}

const runSeedTableComments = () => {
    return seedTableComments(comments)
        .then(() => {
            db.end()
        })
}

runSeedTableComments();