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
