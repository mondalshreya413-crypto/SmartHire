package com.smarthire.smarthire.dto;

import jakarta.validation.constraints.NotBlank;

public class ApplicationStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public ApplicationStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}