CREATE TYPE user_status AS ENUM ('Dev', 'Lead', 'Admin', 'Other');
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    user_rank user_status DEFAULT 'Other' NOT NULL,
    department VARCHAR(50)
);