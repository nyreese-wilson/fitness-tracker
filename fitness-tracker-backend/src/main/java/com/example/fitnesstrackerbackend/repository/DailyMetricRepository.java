package com.example.fitnesstrackerbackend.repository;

import com.example.fitnesstrackerbackend.model.DailyMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DailyMetricRepository extends JpaRepository<DailyMetric, Integer> {
    List<DailyMetric> findByUserId(Integer userId);
}
