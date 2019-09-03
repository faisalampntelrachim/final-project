const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbuser, dbpass } = require("../secrets");
    db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/petition`);
}

exports.addUsers = function(first, last, email, password, created_at) {
    console.log(" user data");
    return db
        .query(
            `INSERT INTO users (first, last, email, password,created_at)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [first, last, email, password, created_at]
        )
        .then(({ rows }) => {
            return rows[0].id;
        });
};

exports.getUsers = function() {
    return db
        .query(
            `SELECT *
            FROM users
            `
        )
        .then(({ rows }) => {
            return rows;
        });
};
