CREATE DATABASE jobhub;

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    company VARCHAR(255),
    position VARCHAR(255),
    role VARCHAR(50)
);

CREATE TABLE profile_worker (
    id VARCHAR PRIMARY KEY,
    job_title VARCHAR(255),
    location VARCHAR(255),
    work_type VARCHAR(255),
    worker_description VARCHAR(255),
    image_profile_worker VARCHAR(255),
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE profile_company (
    id VARCHAR PRIMARY KEY,
    location VARCHAR(255),
    company_description VARCHAR(255),
    image_profile_company VARCHAR(255),
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE social_media (
    id VARCHAR PRIMARY KEY,
    email VARCHAR(255),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE skill (
    id VARCHAR PRIMARY KEY,
    name_skill VARCHAR(255),
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE portfolio (
    id VARCHAR PRIMARY KEY,
    name_portfolio VARCHAR(255),
    link_repository VARCHAR(255),
    type_portfolio VARCHAR(255),
    image_portfolio VARCHAR(255),
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE experience_work (
    id VARCHAR PRIMARY KEY,
    name_company VARCHAR(255),
    name_position VARCHAR(255),
    start_work DATE,
    end_work DATE,
    image_experience_company VARCHAR(255),
    job_description TEXT,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
