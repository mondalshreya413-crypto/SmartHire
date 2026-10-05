package com.smarthire.smarthire.service;

import com.smarthire.smarthire.dto.JobRequest;
import com.smarthire.smarthire.exception.JobNotFoundException;
import com.smarthire.smarthire.model.Job;
import com.smarthire.smarthire.repository.JobRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(JobRequest request) {

        Job job = new Job(
                null,
                request.getTitle(),
                request.getCompany(),
                request.getLocation(),
                request.getDescription(),
                request.getEmploymentType(),
                request.getSalary()
        );

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException(
                                "Job not found with id: " + id
                        )
                );
    }

    public Job updateJob(Long id, JobRequest request) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException(
                                "Job not found with id: " + id
                        )
                );

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());
        job.setEmploymentType(request.getEmploymentType());
        job.setSalary(request.getSalary());

        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {

        if (!jobRepository.existsById(id)) {

            throw new JobNotFoundException(
                    "Job not found with id: " + id
            );
        }

        jobRepository.deleteById(id);
    }
}