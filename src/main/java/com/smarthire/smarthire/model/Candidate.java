package com.smarthire.smarthire.model;

public class Candidate {

    private Long id;
    private String name;
    private String email;
    private int experience;
    private double expectedSalary;

    public Candidate(Long id, String name, String email, int experience, double expectedSalary) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.experience = experience;
        this.expectedSalary = expectedSalary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public double getExpectedSalary() {
        return expectedSalary;
    }

    public void setExpectedSalary(double expectedSalary) {
        this.expectedSalary = expectedSalary;
    }
}