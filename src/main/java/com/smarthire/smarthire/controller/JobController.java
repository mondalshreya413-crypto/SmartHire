package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.JobRequest;
import com.smarthire.smarthire.model.Job;
import com.smarthire.smarthire.service.JobService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Create Job
    @PostMapping
    public ResponseEntity<Job> createJob(
            @Valid @RequestBody JobRequest request) {

        Job job = jobService.createJob(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(job);
    }

    // Get All Jobs
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }

    // Get Job By ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.getJobById(id)
        );
    }

    // Update Job
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request) {

        return ResponseEntity.ok(
                jobService.updateJob(id, request)
        );
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                "Job deleted successfully"
        );
    }

    // Search By Title
    @GetMapping("/search/title")
    public ResponseEntity<List<Job>> searchByTitle(
            @RequestParam String title) {

        return ResponseEntity.ok(
                jobService.searchByTitle(title)
        );
    }

    // Search By Company
    @GetMapping("/search/company")
    public ResponseEntity<List<Job>> searchByCompany(
            @RequestParam String company) {

        return ResponseEntity.ok(
                jobService.searchByCompany(company)
        );
    }

    // Search By Location
    @GetMapping("/search/location")
    public ResponseEntity<List<Job>> searchByLocation(
            @RequestParam String location) {

        return ResponseEntity.ok(
                jobService.searchByLocation(location)
        );
    }

    // Filter By Salary
    @GetMapping("/filter/salary")
    public ResponseEntity<List<Job>> filterBySalary(
            @RequestParam double maxSalary) {

        return ResponseEntity.ok(
                jobService.filterBySalary(maxSalary)
        );
    }

    // Filter By Employment Type
    @GetMapping("/filter/employment-type")
    public ResponseEntity<List<Job>> filterByEmploymentType(
            @RequestParam String employmentType) {

        return ResponseEntity.ok(
                jobService.filterByEmploymentType(employmentType)
        );
    }
}