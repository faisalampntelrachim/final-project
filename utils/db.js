const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbuser, dbpass } = require("../secrets");
    db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/socialnetwork`);
}

exports.addUsers = function(first, last, email, password) {
    console.log(" user data");
    return db
        .query(
            `INSERT INTO users
            (first, last, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [first, last, email, password]
        )
        .then(({ rows }) => {
            return rows[0].id;
        });
};

// query for the log in
exports.getHashedpassword = function(email) {
    return db
        .query(
            `SELECT password,
            id FROM users
            WHERE email=$1`,
            [email]
        )
        .then(({ rows }) => {
            return rows;
        });
};
exports.addUsersInfo = function(id) {
    return db
        .query(
            `SELECT *
            FROM users
            WHERE id=$1
            `,
            [id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

//logo or app to mkae the imageurl appear
exports.addUsersUpdate = function(id, imageurl) {
    console.log("users table update");
    return db.query(
        `UPDATE users
        SET
        imageurl=$2
        WHERE id = $1
        RETURNING imageurl`,
        [id, imageurl]
    );
};

//to get bio from users
exports.addUsersBio = function(id, bio) {
    console.log("users table update");
    return db.query(
        `UPDATE users
        SET
        bio=$2
        WHERE id = $1
        RETURNING bio`,
        [id, bio]
    );
};

// to limit to 3 users to appear
exports.getSomeUsers = function() {
    return db
        .query(
            `SELECT
            *
            FROM users
            ORDER BY
            id DESC
            LIMIT 3
            `
        )
        .then(({ rows }) => {
            return rows;
        });
};
//to find all of the relevant users I'm typing
exports.getMatchingUsers = function(val) {
    return db.query(
        `SELECT *
        FROM users
        WHERE first
        ILIKE $1;`,
        [val + "%"]
    );
};

//Is there an existing friend request between the given pair of users?
exports.getFriendships = function(receiver_id, sender_id) {
    return db
        .query(
            `SELECT *
            FROM friendships
            WHERE
            (receiver_id =$1 AND sender_id =$2)
            OR
            (sender_id =$1  AND receiver_id =$2)
            `,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};
// insert new friendships. if somebody makes a friend request
exports.addFriendships = function(receiver_id, sender_id) {
    return db
        .query(
            `INSERT
            INTO friendships
            (receiver_id, sender_id)
            VALUES ($1, $2)
            `,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};
// when the relathionship exists and they haven't clicked accept
exports.acceptFriend = function(receiver_id, sender_id) {
    return db
        .query(
            `UPDATE
            friendships
            SET accepted = TRUE
            WHERE
            (receiver_id = $1 AND sender_id = $2)
            OR
            (receiver_id = $2 AND sender_id = $1)
            RETURNING *`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => rows);
};

// delete and cancel friend
exports.deleteFriend = function(receiver_id, sender_id) {
    return db
        .query(
            `DELETE
            FROM friendships
            WHERE
            (receiver_id = $1 AND sender_id = $2)
            OR
            (receiver_id = $2 AND sender_id = $1)`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => rows);
};
// REFERENCES it guarantes for every receiver user there is an id

//that will give all of the rows between the users
// SELECT * FROM friesndships
// WHERE
// (receiver_id =$1 AND sender_id =$2)
// OR
// ( receiver_id =$2 AND SENDER_id =$1)
