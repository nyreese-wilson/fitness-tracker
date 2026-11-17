package com.example.fitnesstrackerbackend.service;

import com.example.fitnesstrackerbackend.model.DailyMetric;
import com.example.fitnesstrackerbackend.model.User;
import com.example.fitnesstrackerbackend.repository.DailyMetricRepository;
import com.example.fitnesstrackerbackend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class DailyMetricService {

    private final DailyMetricRepository dailyMetricRepository;
    private final UserRepository userRepository;

    public DailyMetricService(DailyMetricRepository dailyMetricRepository, UserRepository userRepository) {
        this.dailyMetricRepository = dailyMetricRepository;
        this.userRepository = userRepository;
    }

    public DailyMetric logDailyMetric(Integer userId, DailyMetric metricData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));

        metricData.setUser(user);

        if (metricData.getLogDate() == null) {
            metricData.setLogDate(LocalDate.now());
        }

        return dailyMetricRepository.save(metricData);
    }

    public List<DailyMetric> getUserMetrics(Integer userId) {
        return dailyMetricRepository.findByUserId(userId);
    }
}

