CREATE TABLE users_projects(
    id SERIAL NOT NULL PRIMARY KEY,
    userid INT REFERENCES users(id),
    projectid INT REFERENCES projects(id)
);