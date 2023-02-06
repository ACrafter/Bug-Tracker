CREATE TYPE ticket_status_type as ENUM ('Open', 'Closed');
CREATE TABLE tickets(
    id SERIAL PRIMARY KEY NOT NULL,
    ticket_status ticket_status_type DEFAULT 'Open' NOT NULL,
    title VARCHAR(50) NOT NULL,
    ticket_type VARCHAR(50) NOT NULL,
    ticket_Description TEXT NOT NULL,
    last_check VARCHAR(50),
    projectid INT REFERENCES projects(id) NOT NULL
);