CREATE TABLE projects(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    project_lang VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    rating INT NOT NULL,
    last_mod_by INT REFERENCES users(id)
);