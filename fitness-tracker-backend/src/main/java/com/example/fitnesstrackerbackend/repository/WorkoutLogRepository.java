package com.example.fitnesstrackerbackend.repository;

import com.example.fitnesstrackerbackend.model.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Integer> {
    List<WorkoutLog> findByUserId(Integer userId);
}




