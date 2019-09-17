DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    message VARCHAR(1000),
    posted_date  VARCHAR(300)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
