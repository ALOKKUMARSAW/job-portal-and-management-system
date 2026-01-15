package com.alok.jobApplication.model;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Entity
public class JobPost {

	@Id
	private int postId;
	private String companyName;
	private String companyLogoText;
	private String postProfile; 
	private String postDesc;
	private Integer reqExperience;
	private List<String> postTechStack;
	private String postingDate;
	private String registrationStatus; // "Reg. Open", "Reg. Closed", "In Progress"
	private LocalDate registrationDeadline; // Date for countdown timer
	private String applicationStatus; // "Eligible to Apply", "Not Eligible", "Application Submitted", "Not Shortlisted"

	// Additional fields from the front-end Create form
	private List<String> rolesAndResponsibilities;
	private String qualification;
	private String specialization;
	private String yearOfPassingUG;
	private String yearOfPassingPG;
	private String workMode;
	private String probationPeriod;
	private String jobLocation;
	private String interviewLocation;
	private String interviewDate;
	private List<String> interviewRounds;
	private String salaryDetails;

	// Qualification percentages and CGPA fields
	private String qualificationPercent10th;
	private String qualificationPercent12th;
	private String qualificationPercentUG;
	private String qualificationPercentPG;
	private String qualificationCGPAUG;
	private String qualificationCGPAPG;

	private String genderPreference;
	private String bondDetails;
	private String backlog;
	
	
}
