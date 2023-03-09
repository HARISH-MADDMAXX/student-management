CREATE DATABASE studentskills;

CREATE TABLE stdskills(
    skill_id SERIAL PRIMARY KEY,
    skillname VARCHAR(255),
    rating INT
);