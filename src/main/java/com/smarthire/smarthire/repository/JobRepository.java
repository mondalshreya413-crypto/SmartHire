package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByTitleContainingIgnoreCase(String title);

    List<Job> findByCompanyContainingIgnoreCase(String company);

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findBySalaryLessThanEqual(double salary);

    List<Job> findByEmploymentTypeIgnoreCase(String employmentType);
}