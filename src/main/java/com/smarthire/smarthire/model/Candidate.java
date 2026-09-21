package com.smarthire.smarthire.model;

public class Candidate {

    private String name;
    private String email;
    private int experience;
    private double expectedSalary;

    public Candidate(String name, String email, int experience, double expectedSalary) {
        this.name = name;
        this.email = email;
        this.experience = experience;
        this.expectedSalary = expectedSalary;
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