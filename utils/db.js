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

// exports.addUsersUpdate = function() {
//     return db
//         .query(
//             `UPDATE users
//             SET first=$2,
//             last=$3,
//              email=$4
//              imageurl=$5
//              WHERE users.id = $1`
//         )
//         .then(({ rows }) => {
//             return rows;
//         });
// };

// exports.getUsers = function() {
//     return db
//         .query(
//             `SELECT *
//             FROM users
//             `
//         )
//         .then(({ rows }) => {
//             return rows;
//         });
// };
