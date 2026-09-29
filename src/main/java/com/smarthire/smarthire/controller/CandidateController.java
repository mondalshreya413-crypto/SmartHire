package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.CandidateRequest;
import com.smarthire.smarthire.model.Candidate;
import com.smarthire.smarthire.service.CandidateService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/candidates")
    public ResponseEntity<Candidate> addCandidate(
            @Valid @RequestBody CandidateRequest request) {

        Candidate candidate = candidateService.addCandidate(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(candidate);
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {

        List<Candidate> candidates =
                candidateService.getAllCandidates();

        return ResponseEntity.ok(candidates);
    }

    // Day 9 - Search candidate by name
    @GetMapping("/candidates/search")
    public ResponseEntity<List<Candidate>> searchByName(
            @RequestParam String name) {

        List<Candidate> candidates =
                candidateService.searchByName(name);

        return ResponseEntity.ok(candidates);
    }

    // Day 9 - Search candidate by email
    @GetMapping("/candidates/search/email")
    public ResponseEntity<List<Candidate>> searchByEmail(
            @RequestParam String email) {

        List<Candidate> candidates =
                candidateService.searchByEmail(email);

        return ResponseEntity.ok(candidates);
    }

    // Day 9 - Filter candidates by minimum experience
    @GetMapping("/candidates/filter/experience")
    public ResponseEntity<List<Candidate>> filterByExperience(
            @RequestParam int minExperience) {

        List<Candidate> candidates =
                candidateService.filterByExperience(minExperience);

        return ResponseEntity.ok(candidates);
    }

    // Day 9 - Filter candidates by maximum salary
    @GetMapping("/candidates/filter/salary")
    public ResponseEntity<List<Candidate>> filterBySalary(
            @RequestParam double maxSalary) {

        List<Candidate> candidates =
                candidateService.filterBySalary(maxSalary);

        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/candidates/{id}")
    public ResponseEntity<Candidate> getCandidateById(
            @PathVariable Long id) {

        Candidate candidate =
                candidateService.getCandidateById(id);

        return ResponseEntity.ok(candidate);
    }

    @PutMapping("/candidates/{id}")
    public ResponseEntity<Candidate> updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateRequest request) {

        Candidate candidate =
                candidateService.updateCandidate(id, request);

        return ResponseEntity.ok(candidate);
    }

    @DeleteMapping("/candidates/{id}")
    public ResponseEntity<String> deleteCandidate(
            @PathVariable Long id) {

        candidateService.deleteCandidate(id);

        return ResponseEntity.ok("Candidate deleted successfully");
    }
}