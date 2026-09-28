package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.CandidateRequest;
import com.smarthire.smarthire.model.Candidate;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CandidateService {

    private List<Candidate> candidates = new ArrayList<>();

    private Long nextId = 1L;

    public Candidate addCandidate(CandidateRequest request) {

        Candidate candidate = new Candidate(
                nextId,
                request.getName(),
                request.getEmail(),
                request.getExperience(),
                request.getExpectedSalary()
        );

        nextId++;

        candidates.add(candidate);

        return candidate;
    }

    public List<Candidate> getAllCandidates() {
        return candidates;
    }

    public Candidate getCandidateById(Long id) {

        for (Candidate candidate : candidates) {

            if (candidate.getId().equals(id)) {
                return candidate;
            }
        }

        return null;
    }
}