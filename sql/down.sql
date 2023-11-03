SELECT
    pg_terminate_backend (
        pg_stat_activity.pg_backend_pid
    )
FROM pg_stat_activity
WHERE
    pg_stat_activity.datname = 'mydb';

DROP TABLE IF EXISTS user_post;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS users;

DROP DATABASE IF EXISTS mydb;