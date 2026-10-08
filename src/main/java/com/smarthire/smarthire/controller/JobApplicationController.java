package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.ApplicationStatusRequest;
import com.smarthire.smarthire.dto.JobApplicationRequest;
import com.smarthire.smarthire.model.JobApplication;
import com.smarthire.smarthire.service.JobApplicationService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(
            JobApplicationService jobApplicationService) {

        this.jobApplicationService = jobApplicationService;
    }

    // Apply for a Job
    @PostMapping
    public ResponseEntity<JobApplication> applyForJob(
            @Valid @RequestBody JobApplicationRequest request) {

        JobApplication application =
                jobApplicationService.applyForJob(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(application);
    }

    // Get applications by Candidate
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<JobApplication>>
    getApplicationsByCandidate(
            @PathVariable Long candidateId) {

        return ResponseEntity.ok(
                jobApplicationService
                        .getApplicationsByCandidate(candidateId)
        );
    }

    // Get applications by Job
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplication>>
    getApplicationsByJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                jobApplicationService
                        .getApplicationsByJob(jobId)
        );
    }

    // Update application status
    @PutMapping("/{id}/status")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationStatusRequest request) {

        JobApplication application =
                jobApplicationService.updateApplicationStatus(
                        id,
                        request
                );

        return ResponseEntity.ok(application);
    }
}

