package com.smarthire.smarthire.service;

import com.smarthire.smarthire.model.Candidate;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CandidateService {

    private List<Candidate> candidates = new ArrayList<>();

    public Candidate addCandidate(Candidate candidate) {

        candidates.add(candidate);

        return candidate;
    }

    public List<Candidate> getAllCandidates() {
        return candidates;
    }
}
