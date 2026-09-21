package com.smarthire.smarthire.model;

public class CandidateTest {

    public static void main(String[] args) {

        Candidate candidate1 = new Candidate(
                "Shreya",
                "shreya@gmail.com",
                0,
                500000
        );

        System.out.println("Name: " + candidate1.getName());
        System.out.println("Email: " + candidate1.getEmail());
        System.out.println("Experience: " + candidate1.getExperience());
        System.out.println("Expected Salary: " + candidate1.getExpectedSalary());
    }
}
