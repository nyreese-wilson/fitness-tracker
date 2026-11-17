-- Run this first if the database does not exist yet:
-- CREATE DATABASE fitness_tracker;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercise_definitions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE workout_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT
);

CREATE TABLE exercise_logs (
    id SERIAL PRIMARY KEY,
    workout_log_id INT REFERENCES workout_logs(id) ON DELETE CASCADE,
    exercise_def_id INT REFERENCES exercise_definitions(id),
    sets INT,
    reps INT,
    weight_lbs NUMERIC(5,2),
    duration_minutes INT
);

CREATE TABLE daily_metrics (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    calories_consumed INT DEFAULT 0,
    weight_lbs NUMERIC(5,2),
    notes TEXT,
    CONSTRAINT unique_user_date UNIQUE (user_id, log_date)
);