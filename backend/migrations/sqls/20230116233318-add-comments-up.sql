CREATE TABLE comments(
    id SERIAL PRIMARY KEY NOT NULL,
    userid INT REFERENCES users(id) NOT NULL,
    comment_date DATE NOT NULL,
    content TEXT,
    likes INT,
    projectid INT REFERENCES projects(id),
    ticketid INT REFERENCES tickets(id),
    parent_comment INT REFERENCES comments(id)
);