-- Seed users
INSERT INTO users (username, email, password)
VALUES 
  ('alice', 'alice@example.com', '$2b$10$X9XrkN3v0VU3v2QqZX2upeOj0DKXDBfHep2.9PKdJGj5RXekU37K6'), -- alice123
  ('bob', 'bob@example.com', '$2b$10$X1Jo7EjcLbNq/gbZhzycZ.Tql1s6DOLQDW5R1AyNf/CjwXp3BT2zq'),   -- bob123
  ('charlie', 'charlie@example.com', '$2b$10$C2cQZEXsFL7myHTPtgYap.3kaNTmHwSgMT1UZyaKK1/FmOZ5CKvdi'); -- charlie123

-- Seed follow relationships
INSERT INTO follows (follower_id, following_id)
SELECT u1.id, u2.id FROM users u1, users u2
WHERE u1.username = 'alice' AND u2.username = 'bob';

INSERT INTO follows (follower_id, following_id)
SELECT u1.id, u2.id FROM users u1, users u2
WHERE u1.username = 'bob' AND u2.username = 'charlie';
