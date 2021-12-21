DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id  SERIAL PRIMARY KEY,
    age INTEGER,
    kind VARCHAR(50),
    name VARCHAR(100)
);


INSERT INTO pets (age, kind, name) VALUES (7,'rainbow','fido');
INSERT INTO pets (age, kind, name) VALUES (5,'snake','buttons');

