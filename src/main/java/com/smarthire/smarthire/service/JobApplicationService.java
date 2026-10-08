package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.ApplicationStatusRequest;
import com.smarthire.smarthire.dto.JobApplicationRequest;
import com.smarthire.smarthire.exception.DuplicateApplicationException;
import com.smarthire.smarthire.exception.InvalidApplicationStatusException;
import com.smarthire.smarthire.model.JobApplication;
import com.smarthire.smarthire.repository.CandidateRepository;
import com.smarthire.smarthire.repository.JobApplicationRepository;
import com.smarthire.smarthire.repository.JobRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;

    public JobApplicationService(
            JobApplicationRepository jobApplicationRepository,
            CandidateRepository candidateRepository,
            JobRepository jobRepository) {

        this.jobApplicationRepository = jobApplicationRepository;
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
    }

    // Apply for a Job
    public JobApplication applyForJob(
            JobApplicationRequest request) {

        Long candidateId = request.getCandidateId();
        Long jobId = request.getJobId();

        // Check candidate exists
        if (!candidateRepository.existsById(candidateId)) {
            throw new RuntimeException(
                    "Candidate not found with id: " + candidateId
            );
        }

        // Check job exists
        if (!jobRepository.existsById(jobId)) {
            throw new RuntimeException(
                    "Job not found with id: " + jobId
            );
        }

        // Check duplicate application
        if (jobApplicationRepository
                .existsByCandidateIdAndJobId(
                        candidateId,
                        jobId)) {

            throw new DuplicateApplicationException(
                    "Candidate has already applied for this job"
            );
        }

        JobApplication application =
                new JobApplication(
                        null,
                        candidateId,
                        jobId,
                        LocalDate.now(),
                        "APPLIED"
                );

        return jobApplicationRepository.save(application);
    }

    // Get applications by Candidate
    public List<JobApplication> getApplicationsByCandidate(
            Long candidateId) {

        return jobApplicationRepository
                .findByCandidateId(candidateId);
    }

    // Get applications by Job
    public List<JobApplication> getApplicationsByJob(
            Long jobId) {

        return jobApplicationRepository
                .findByJobId(jobId);
    }

    // Update application status
    public JobApplication updateApplicationStatus(
            Long applicationId,
            ApplicationStatusRequest request) {

        JobApplication application =
                jobApplicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found with id: "
                                                + applicationId
                                )
                        );

        // Convert status to uppercase
        String status = request.getStatus().toUpperCase();

        // Validate status
        if (!status.equals("APPLIED")
                && !status.equals("SHORTLISTED")
                && !status.equals("INTERVIEW")
                && !status.equals("SELECTED")
                && !status.equals("REJECTED")) {

            throw new InvalidApplicationStatusException(
                    "Invalid application status: "
                            + request.getStatus()
            );
        }

        application.setStatus(status);

        return jobApplicationRepository.save(application);
    }
}