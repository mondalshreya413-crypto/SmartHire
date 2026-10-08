package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.InterviewRequest;
import com.smarthire.smarthire.model.Interview;
import com.smarthire.smarthire.service.InterviewService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(
            InterviewService interviewService) {

        this.interviewService = interviewService;
    }

    @PostMapping
    public ResponseEntity<Interview> scheduleInterview(
            @Valid @RequestBody InterviewRequest request) {

        Interview interview =
                interviewService.scheduleInterview(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interview);
    }

    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {

        return ResponseEntity.ok(
                interviewService.getAllInterviews()
        );
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<Interview>>
    getInterviewsByCandidate(
            @PathVariable Long candidateId) {

        return ResponseEntity.ok(
                interviewService
                        .getInterviewsByCandidate(candidateId)
        );
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Interview>>
    getInterviewsByJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                interviewService
                        .getInterviewsByJob(jobId)
        );
    }
}