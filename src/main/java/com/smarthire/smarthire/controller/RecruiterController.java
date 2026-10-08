package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.RecruiterRequest;
import com.smarthire.smarthire.model.Recruiter;
import com.smarthire.smarthire.service.RecruiterService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recruiters")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(
            RecruiterService recruiterService) {

        this.recruiterService = recruiterService;
    }

    @PostMapping
    public ResponseEntity<Recruiter> createRecruiter(
            @Valid @RequestBody RecruiterRequest request) {

        Recruiter recruiter =
                recruiterService.createRecruiter(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(recruiter);
    }

    @GetMapping
    public ResponseEntity<List<Recruiter>> getAllRecruiters() {

        return ResponseEntity.ok(
                recruiterService.getAllRecruiters()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recruiter> getRecruiterById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                recruiterService.getRecruiterById(id)
        );
    }
}