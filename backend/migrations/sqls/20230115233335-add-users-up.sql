CREATE TYPE user_status AS ENUM ('Dev', 'Lead', 'Admin', 'Other');
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_rank user_status DEFAULT 'Other' NOT NULL,
    department VARCHAR(50)
);