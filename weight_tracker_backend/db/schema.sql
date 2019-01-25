DROP DATABASE IF EXISTS weight_tracker;
CREATE DATABASE weight_tracker;

\c weight_tracker;

CREATE TABLE IF NOT EXISTS users(
   user_id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email TEXT UNIQUE NOT NULL,
   hash varchar(100) NOT NULL,
   joined TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS measurements(
   id SERIAL PRIMARY KEY,
   date  DATE,
   value SMALLINT,
   user_id INT REFERENCES users(user_id)
);
