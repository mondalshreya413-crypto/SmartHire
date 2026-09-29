package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByNameContainingIgnoreCase(String name);

    List<Candidate> findByEmailContainingIgnoreCase(String email);

    List<Candidate> findByExperienceGreaterThanEqual(int experience);

    List<Candidate> findByExpectedSalaryLessThanEqual(double salary);
}
