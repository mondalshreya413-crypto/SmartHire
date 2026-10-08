package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.InterviewRequest;
import com.smarthire.smarthire.model.Interview;
import com.smarthire.smarthire.repository.CandidateRepository;
import com.smarthire.smarthire.repository.InterviewRepository;
import com.smarthire.smarthire.repository.JobRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;

    public InterviewService(
            InterviewRepository interviewRepository,
            CandidateRepository candidateRepository,
            JobRepository jobRepository) {

        this.interviewRepository = interviewRepository;
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
    }

    public Interview scheduleInterview(
            InterviewRequest request) {

        Long candidateId = request.getCandidateId();
        Long jobId = request.getJobId();

        if (!candidateRepository.existsById(candidateId)) {
            throw new RuntimeException(
                    "Candidate not found with id: " + candidateId
            );
        }

        if (!jobRepository.existsById(jobId)) {
            throw new RuntimeException(
                    "Job not found with id: " + jobId
            );
        }

        Interview interview = new Interview(
                null,
                candidateId,
                jobId,
                request.getInterviewDate(),
                request.getInterviewTime(),
                request.getInterviewType(),
                "SCHEDULED"
        );

        return interviewRepository.save(interview);
    }

    public List<Interview> getAllInterviews() {

        return interviewRepository.findAll();
    }

    public List<Interview> getInterviewsByCandidate(
            Long candidateId) {

        return interviewRepository
                .findByCandidateId(candidateId);
    }

    public List<Interview> getInterviewsByJob(
            Long jobId) {

        return interviewRepository
                .findByJobId(jobId);
    }
}