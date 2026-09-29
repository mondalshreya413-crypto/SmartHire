package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    // Search candidate by name
    List<Candidate> findByNameContainingIgnoreCase(String name);

    // Search candidate by email
    List<Candidate> findByEmailContainingIgnoreCase(String email);

    // Filter candidates by minimum experience
    List<Candidate> findByExperienceGreaterThanEqual(int experience);

    // Filter candidates by maximum expected salary
    List<Candidate> findByExpectedSalaryLessThanEqual(double salary);
}
