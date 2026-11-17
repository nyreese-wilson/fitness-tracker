package com.example.fitnesstrackerbackend.repository;
import com.example.fitnesstrackerbackend.model.ExerciseDefinition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseDefinitionRepository extends JpaRepository<ExerciseDefinition, Integer> {}
