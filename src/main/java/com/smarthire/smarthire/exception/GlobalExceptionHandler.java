package com.smarthire.smarthire.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CandidateNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleCandidateNotFound(
            CandidateNotFoundException exception) {

        return Map.of(
                "message",
                exception.getMessage()
        );
    }

    @ExceptionHandler(JobNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleJobNotFound(
            JobNotFoundException exception) {

        return Map.of(
                "message",
                exception.getMessage()
        );
    }

    @ExceptionHandler(DuplicateApplicationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleDuplicateApplication(
            DuplicateApplicationException exception) {

        return Map.of(
                "message",
                exception.getMessage()
        );
    }

    @ExceptionHandler(InvalidApplicationStatusException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleInvalidApplicationStatus(
            InvalidApplicationStatusException exception) {

        return Map.of(
                "message",
                exception.getMessage()
        );
    }
}