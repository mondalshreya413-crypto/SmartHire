package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}