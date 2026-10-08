package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecruiterRepository
        extends JpaRepository<Recruiter, Long> {

    Optional<Recruiter> findByEmail(String email);
}