# Full-Stack Fitness Tracker

A three-tier full-stack web application for tracking workouts, exercise sets/reps/weights, and daily nutrition metrics.

## Tech Stack
* **Front-End:** React, Vite, JavaScript, CSS
* **Back-End:** Java, Spring Boot, Spring Data JPA
* **Database:** PostgreSQL

## Project Structure
```text
├── fitness-tracker-database/  # PostgreSQL schema and seed scripts
│   ├── schema.sql
│   └── seed.sql
├── fitness-tracker-backend/   # Spring Boot REST API
└── fitness-tracker-frontend/  # React + Vite client application
```

## Database Schema
The PostgreSQL database (`fitness_tracker`) is structured across five relational tables:
* `users` – Stores user account details.
* `exercise_definitions` – Reference catalog of Strength and Cardio exercises.
* `workout_logs` – Tracks individual workout sessions linked to a user.
* `exercise_logs` – Records sets, reps, weight, and duration for each exercise in a workout.
* `daily_metrics` – Logs daily calorie and macronutrient/wellness metrics per user and date.

## Setup & Installation

### 1. Database Setup (PostgreSQL)
1. Create a local PostgreSQL database named `fitness_tracker`.
2. Run `fitness-tracker-database/schema.sql` to create the tables and foreign key constraints.
3. Run `fitness-tracker-database/seed.sql` to populate default Strength and Cardio exercises.

### 2. Back-End Setup (Spring Boot)
1. Open `fitness-tracker-backend/src/main/resources/application.properties`.
2. Replace `YOUR_POSTGRES_PASSWORD` with your local PostgreSQL password.
3. Run the Spring Boot application (`FitnessTrackerBackendApplication.java` or `./mvnw spring-boot:run`). The API runs on `http://localhost:8080`.

### 3. Front-End Setup (React)
1. Open a terminal inside `fitness-tracker-frontend`.
2. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL shown in your terminal (typically `http://localhost:5173`).
