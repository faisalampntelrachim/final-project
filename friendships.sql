DROP TABLE IF EXISTS friendships;

CREATE TABLE frienships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);
