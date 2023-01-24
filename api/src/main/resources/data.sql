DROP TABLE IF EXISTS cat;

CREATE TABLE cat (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  color VARCHAR(250),
  race VARCHAR(250),
  species VARCHAR(250),
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  deleted BOOLEAN DEFAULT 0
);

INSERT INTO cat (name, color, race, species) VALUES
  ('Jinx', 'black', 'street', 'cat'),
  ('Lucky', 'brown', 'street', 'cat');