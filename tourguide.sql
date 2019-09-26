DROP TABLE IF EXISTS tourguides;

CREATE TABLE tourguides(
    id SERIAL PRIMARY KEY,
    url VARCHAR(300) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT
);
