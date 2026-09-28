package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}
