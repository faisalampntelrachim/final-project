DROP TABLE IF EXISTS tours;

CREATE TABLE tours(
    id SERIAL PRIMARY KEY,
    url VARCHAR(300) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT
);
