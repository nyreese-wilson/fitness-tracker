package com.example.fitnesstrackerbackend.controller;

import com.example.fitnesstrackerbackend.model.DailyMetric;
import com.example.fitnesstrackerbackend.service.DailyMetricService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/metrics")
@CrossOrigin(origins = "http://localhost:5173")
public class DailyMetricController {

    private final DailyMetricService dailyMetricService;

    public DailyMetricController(DailyMetricService dailyMetricService) {
        this.dailyMetricService = dailyMetricService;
    }

    @PostMapping
    public ResponseEntity<DailyMetric> addMetric(
            @PathVariable Integer userId,
            @RequestBody DailyMetric metric) {
        DailyMetric savedMetric = dailyMetricService.logDailyMetric(userId, metric);
        return ResponseEntity.ok(savedMetric);
    }

    @GetMapping
    public ResponseEntity<List<DailyMetric>> getMetrics(@PathVariable Integer userId) {
        List<DailyMetric> history = dailyMetricService.getUserMetrics(userId);
        return ResponseEntity.ok(history);
    }
}
