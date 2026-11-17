INSERT INTO exercise_definitions (name, category) VALUES
('Bench Press', 'Strength'),
('Barbell Squat', 'Strength'),
('Deadlift', 'Strength'),
('Overhead Press', 'Strength'),
('Dumbbell Bicep Curl', 'Strength'),
('Tricep Pushdown', 'Strength'),
('Lat Pulldown', 'Strength'),
('Push-Up', 'Strength'),
('Pull-Up', 'Strength'),
('Treadmill Running', 'Cardio'),
('Stationary Cycling', 'Cardio'),
('Rowing Machine', 'Cardio'),
('Jump Rope', 'Cardio')
ON CONFLICT (name) DO NOTHING;