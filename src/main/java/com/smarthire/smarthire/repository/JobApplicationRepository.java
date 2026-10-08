package com.smarthire.smarthire.repository;

import com.smarthire.smarthire.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByCandidateId(Long candidateId);

    List<JobApplication> findByJobId(Long jobId);

    boolean existsByCandidateIdAndJobId(
            Long candidateId,
            Long jobId
    );
}
