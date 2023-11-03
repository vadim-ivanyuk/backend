CREATE TABLE
    users (
        user_id serial PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL,
        email VARCHAR (100) UNIQUE NOT NULL,
        created_at TIMESTAMP
    );

CREATE TABLE
    posts (
        post_id serial PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        title VARCHAR (100),
        content TEXT,
        created_at TIMESTAMP
    );

CREATE TABLE
    user_post (
        user_id INT REFERENCES users(user_id),
        post_id INT REFERENCES posts(post_id),
        PRIMARY KEY (user_id, post_id)
    );

INSERT INTO
    users (username, email, created_at)
VALUES (
        'user1',
        'user1@example.com',
        NOW()
    ), (
        'user2',
        'user2@example.com',
        NOW()
    ), (
        'user3',
        'user3@example.com',
        NOW()
    );

INSERT INTO
    posts (
        user_id,
        title,
        content,
        created_at
    )
VALUES (
        1,
        'Post 1',
        'Content of Post 1',
        NOW()
    ), (
        1,
        'Post 2',
        'Content of Post 2',
        NOW()
    ), (
        2,
        'Post 3',
        'Content of Post 3',
        NOW()
    );

INSERT INTO
    user_post (user_id, post_id)
VALUES (1, 1), (1, 2), (2, 3);

SELECT u.username, p.title
FROM users u
    LEFT JOIN posts p ON u.user_id = p.user_id;

SELECT p.title, p.content FROM posts p WHERE p.user_id = 1;

SELECT
    u.username,
    COUNT(p.post_id) AS post_count
FROM users u
    LEFT JOIN posts p ON u.user_id = p.user_id
GROUP BY u.username;

SELECT p.title, p.created_at FROM posts p ORDER BY p.created_at DESC;

SELECT p.title, p.content
FROM posts p
ORDER BY p.created_at
OFFSET 1
LIMIT 2;

SELECT p.title, p.content
FROM posts p
WHERE
    LOWER(p.title) LIKE '%content%'
    OR LOWER(p.content) LIKE '%content%';