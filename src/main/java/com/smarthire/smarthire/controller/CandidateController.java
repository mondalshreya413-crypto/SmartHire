package com.smarthire.smarthire.controller;

import com.smarthire.smarthire.dto.CandidateRequest;
import com.smarthire.smarthire.model.Candidate;
import com.smarthire.smarthire.service.CandidateService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/candidates")
    public Candidate addCandidate(
            @Valid @RequestBody CandidateRequest request) {

        return candidateService.addCandidate(request);
    }

    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {

        return candidateService.getAllCandidates();
    }

    @GetMapping("/candidates/{id}")
    public Candidate getCandidateById(@PathVariable Long id) {

        return candidateService.getCandidateById(id);
    }

    @PutMapping("/candidates/{id}")
    public Candidate updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateRequest request) {

        return candidateService.updateCandidate(id, request);
    }

    @DeleteMapping("/candidates/{id}")
    public String deleteCandidate(@PathVariable Long id) {

        candidateService.deleteCandidate(id);

        return "Candidate deleted successfully";
    }
}