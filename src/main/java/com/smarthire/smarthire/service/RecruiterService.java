package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.RecruiterRequest;
import com.smarthire.smarthire.model.Recruiter;
import com.smarthire.smarthire.repository.RecruiterRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterService {

    private final RecruiterRepository recruiterRepository;

    public RecruiterService(
            RecruiterRepository recruiterRepository) {

        this.recruiterRepository = recruiterRepository;
    }

    public Recruiter createRecruiter(
            RecruiterRequest request) {

        if (recruiterRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new RuntimeException(
                    "Recruiter with this email already exists"
            );
        }

        Recruiter recruiter = new Recruiter(
                null,
                request.getName(),
                request.getEmail(),
                request.getCompany()
        );

        return recruiterRepository.save(recruiter);
    }

    public List<Recruiter> getAllRecruiters() {

        return recruiterRepository.findAll();
    }

    public Recruiter getRecruiterById(Long id) {

        return recruiterRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Recruiter not found with id: " + id
                        )
                );
    }
}