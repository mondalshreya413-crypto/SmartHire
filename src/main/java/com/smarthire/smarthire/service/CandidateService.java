package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.CandidateRequest;
import com.smarthire.smarthire.exception.CandidateNotFoundException;
import com.smarthire.smarthire.model.Candidate;
import com.smarthire.smarthire.repository.CandidateRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public Candidate addCandidate(CandidateRequest request) {

        Candidate candidate = new Candidate(
                null,
                request.getName(),
                request.getEmail(),
                request.getExperience(),
                request.getExpectedSalary()
        );

        return candidateRepository.save(candidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    // Day 9 - Search candidate by name
    public List<Candidate> searchByName(String name) {
        return candidateRepository.findByNameContainingIgnoreCase(name);
    }

    // Day 9 - Search candidate by email
    public List<Candidate> searchByEmail(String email) {
        return candidateRepository.findByEmailContainingIgnoreCase(email);
    }

    // Day 9 - Filter candidates by minimum experience
    public List<Candidate> filterByExperience(int minExperience) {
        return candidateRepository.findByExperienceGreaterThanEqual(minExperience);
    }

    // Day 9 - Filter candidates by maximum salary
    public List<Candidate> filterBySalary(double maxSalary) {
        return candidateRepository.findByExpectedSalaryLessThanEqual(maxSalary);
    }

    public Candidate getCandidateById(Long id) {

        return candidateRepository.findById(id)
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found with id: " + id
                        )
                );
    }

    public Candidate updateCandidate(Long id, CandidateRequest request) {

        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() ->
                        new CandidateNotFoundException(
                                "Candidate not found with id: " + id
                        )
                );

        candidate.setName(request.getName());
        candidate.setEmail(request.getEmail());
        candidate.setExperience(request.getExperience());
        candidate.setExpectedSalary(request.getExpectedSalary());

        return candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long id) {

        if (!candidateRepository.existsById(id)) {
            throw new CandidateNotFoundException(
                    "Candidate not found with id: " + id
            );
        }

        candidateRepository.deleteById(id);
    }
}