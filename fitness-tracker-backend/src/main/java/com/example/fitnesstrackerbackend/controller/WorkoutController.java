package com.example.fitnesstrackerbackend.controller;

import com.example.fitnesstrackerbackend.model.WorkoutLog;
import com.example.fitnesstrackerbackend.service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/workouts")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public ResponseEntity<WorkoutLog> addWorkout(
            @PathVariable Integer userId,
            @RequestBody WorkoutLog workoutLog) {
        WorkoutLog savedWorkout = workoutService.logWorkout(userId, workoutLog);
        return ResponseEntity.ok(savedWorkout);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutLog>> getWorkoutHistory(@PathVariable Integer userId) {
        List<WorkoutLog> logs = workoutService.getUserWorkouts(userId);
        return ResponseEntity.ok(logs);
    }
}

