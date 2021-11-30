CREATE DATABASE memepedia;

CREATE TABLE memes (id SERIAL, url TEXT, text TEXT, published_by INTEGER);

CREATE TABLE users (id SERIAL, name TEXT, email TEXT, password TEXT);

INSERT INTO sessions ("userId", token) VALUES (1, '2a881acf-e69c-49f8-856f-2b447da28498');

INSERT INTO users (name, email, password) VALUES ('Uncle Bob', 'clean@code.com', '$2b$10$0KtR/fAF5O1VTqVxt15gfeFF1DHLCAm.hzzNOvZm8T3CZ8DghZmWK');

INSERT INTO memes (url, text, published_by) VALUES ('https://pbs.twimg.com/media/BQkhcYwCYAAqqsn?format=jpg', 'no test no beer', 1);
INSERT INTO memes (url, text, published_by) VALUES ('http://images7.memedroid.com/images/UPLOADED124/56f2cef471ade.jpeg', 'você era o melhor jogador até que decidiu jogar online', 1);