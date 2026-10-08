package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.JobApplicationRequest;
import com.smarthire.smarthire.exception.DuplicateApplicationException;
import com.smarthire.smarthire.repository.CandidateRepository;
import com.smarthire.smarthire.repository.JobApplicationRepository;
import com.smarthire.smarthire.repository.JobRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JobApplicationServiceTest {

    @Mock
    private JobApplicationRepository jobApplicationRepository;

    @Mock
    private CandidateRepository candidateRepository;

    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private JobApplicationService jobApplicationService;

    @Test
    void shouldRejectDuplicateApplication() {

        JobApplicationRequest request =
                new JobApplicationRequest();

        request.setCandidateId(6L);
        request.setJobId(2L);

        when(candidateRepository.existsById(6L))
                .thenReturn(true);

        when(jobRepository.existsById(2L))
                .thenReturn(true);

        when(jobApplicationRepository
                .existsByCandidateIdAndJobId(6L, 2L))
                .thenReturn(true);

        assertThrows(
                DuplicateApplicationException.class,
                () -> jobApplicationService.applyForJob(request)
        );
    }
}

