package com.alok.jobApplication.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.alok.jobApplication.model.JobPost;
import com.alok.jobApplication.repo.JobRepo;


@Service
public class JobService {

	@Autowired
	public JobRepo repo;
	
	// Method to automatically update registration status when deadlines pass
	@Scheduled(fixedRate = 60000) // Run every minute
	public void updateExpiredRegistrations() {
		List<JobPost> allJobs = repo.findAll();
		LocalDateTime now = LocalDateTime.now();
		
		for (JobPost job : allJobs) {
			if (job.getRegistrationDeadline() != null && job.getRegistrationStatus().equals("Reg. Open")) {
				try {
					// Convert LocalDate to LocalDateTime at end of day (23:59)
					LocalDateTime deadline = job.getRegistrationDeadline().atTime(23, 59);
					if (now.isAfter(deadline)) {
						job.setRegistrationStatus("Reg. Closed");
						repo.save(job);
						System.out.println("Auto-closed registration for job: " + job.getPostProfile());
					}
				} catch (Exception e) {
					// Handle parsing errors gracefully
					System.err.println("Error processing deadline for job " + job.getPostId() + ": " + e.getMessage());
				}
			}
		}
	}
	
	
		//method to return all JobPosts
		public List<JobPost> getAllJobs() {
			return repo.findAll();

			
		}
		
		
		// method to add a jobPost
		public void addJob(JobPost jobPost) {
			 repo.save(jobPost);
		
		}

        //method to get job by id
		public JobPost getJob(int postId) {
			
			return repo.findById(postId).orElse(new JobPost());
		}

        //method to update job with job post object
		public void updateJob(JobPost jobPost) {
		repo.save(jobPost);
			
		}


        //method to delete job post by id 
		public void deleteJob(int postId) {
			repo.deleteById(postId);
			
		}


		public void load() {
			// arrayList to store store JobPost objects
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			String today = LocalDate.now().format(formatter);
			String yesterday = LocalDate.now().minusDays(1).format(formatter);
			String twoDaysAgo = LocalDate.now().minusDays(2).format(formatter);
			String threeDaysAgo = LocalDate.now().minusDays(3).format(formatter);

			// Structured JSON for MRI Software job
			String mriJobDesc = "{\"rolesAndResponsibilities\":[\"Manage and optimize database systems for enterprise applications.\",\"Design and implement database schemas and structures.\",\"Monitor database performance and troubleshoot issues.\",\"Ensure data security and backup procedures.\",\"Collaborate with development teams on database requirements.\"],\"qualification\":\"Any\",\"specialization\":\"Any\",\"yearOfPassingUG\":\"2023, 2024\",\"yearOfPassingPG\":\"2023, 2024\",\"technology\":\"SQL, Good Communication\",\"workMode\":\"Office\",\"probationPeriod\":\"3 Months\",\"jobLocation\":\"BTM 2nd Stage, BTM Layout, Bangalore\",\"interviewLocation\":\"Virtual\",\"interviewDate\":\"2025-11-20\",\"interviewRounds\":[\"Round 1: Written Test(Virtual)\",\"Round 2: Technical Round(Virtual)\",\"Round 3: HR Round(Virtual)\"],\"salaryDetails\":\"₹ 4.5 LPA\\nInternship stipend: ₹20,000-25,000 per month\\nPost-conversion (Full-time): ₹4.5 LPA (Performance based)\",\"qualificationPercentages\":{\"10th\":\"70%\",\"12th\":\"70%\",\"UG\":\"70%\",\"PG\":\"70%\"},\"qualificationCGPA\":{\"UG\":\"7 CGPA\",\"PG\":\"7 CGPA\"},\"genderPreference\":\"None\",\"bondDetails\":\"0 Months\",\"backlog\":\"NOT ALLOWED\"}";

			// Additional sample jobs matching the image
			String nielsenIQJobDesc = "{\"rolesAndResponsibilities\":[\"Assist in data operations and processing.\",\"Work with MS Excel for data analysis.\",\"Maintain data quality and accuracy.\",\"Support data collection and validation processes.\"],\"qualification\":\"Any\",\"specialization\":\"Any\",\"yearOfPassingUG\":\"2023, 2024\",\"workMode\":\"Office\",\"jobLocation\":\"Porur, Chennai\",\"interviewLocation\":\"On-site\",\"salaryDetails\":\"₹ 3.46 LPA\",\"qualificationPercentages\":{\"10th\":\"70%\",\"12th\":\"70%\",\"UG\":\"70%\"},\"genderPreference\":\"None\",\"bondDetails\":\"0 Months\",\"backlog\":\"NOT ALLOWED\"}";

			String leadSquaredJobDesc = "{\"rolesAndResponsibilities\":[\"Perform manual testing of applications.\",\"Develop and execute automation test scripts.\",\"Identify and report bugs.\",\"Collaborate with development team.\"],\"qualification\":\"Any\",\"specialization\":\"Any\",\"yearOfPassingUG\":\"2023, 2024\",\"workMode\":\"Office\",\"jobLocation\":\"Bengaluru\",\"interviewLocation\":\"Virtual\",\"salaryDetails\":\"₹ 10 LPA\",\"qualificationPercentages\":{\"10th\":\"70%\",\"12th\":\"70%\",\"UG\":\"70%\"},\"genderPreference\":\"None\",\"bondDetails\":\"0 Months\",\"backlog\":\"NOT ALLOWED\"}";

			String detectTechJobDesc = "{\"rolesAndResponsibilities\":[\"Work as SOM Engineer on system optimization.\",\"Develop Python-based solutions.\",\"Communicate effectively with team members.\",\"Maintain system documentation.\"],\"qualification\":\"B.Tech\",\"specialization\":\"Computer Science\",\"yearOfPassingUG\":\"2023, 2024\",\"workMode\":\"Office\",\"jobLocation\":\"Chennai\",\"interviewLocation\":\"On-site\",\"salaryDetails\":\"₹ 4.5 LPA\",\"qualificationPercentages\":{\"UG\":\"7 CGPA\"},\"genderPreference\":\"None\",\"bondDetails\":\"0 Months\",\"backlog\":\"NOT ALLOWED\"}";

			String outboxLabsJobDesc = "{\"rolesAndResponsibilities\":[\"Develop backend services using NodeJS.\",\"Design and maintain MySQL databases.\",\"Write TypeScript code for server-side logic.\",\"Implement RESTful APIs.\"],\"qualification\":\"B.Tech\",\"specialization\":\"Computer Science\",\"yearOfPassingUG\":\"2022, 2023\",\"workMode\":\"Office\",\"jobLocation\":\"Bengaluru\",\"interviewLocation\":\"On-site\",\"salaryDetails\":\"₹ 9 LPA\",\"qualificationPercentages\":{\"UG\":\"7.5 CGPA\"},\"genderPreference\":\"None\",\"bondDetails\":\"0 Months\",\"backlog\":\"NOT ALLOWED\"}";

			String omniReachJobDesc = "{\"rolesAndResponsibilities\":[\"Assist in data collection, cleaning, transformation, and analysis for machine learning projects.\",\"Write clean, efficient Python code for data preparation, ETL processes, and feature engineering.\",\"Support the development of basic ML models under guidance starting with regression, classification, and clustering.\",\"Create dashboards, reports, or simple visualizations for data insights.\",\"Document workflows, processes, and learnings to build strong technical and analytical practices.\",\"Learn and apply cloud concepts (AWS/GCP/Azure basics) and SQL best practices over time.\"],\"qualification\":\"Any\",\"specialization\":\"Any\",\"yearOfPassingUG\":\"2023, 2024\",\"yearOfPassingPG\":\"2023, 2024\",\"technology\":\"Python, SQL, relational databases, logical thinking, analytical thinking, communication skills\",\"workMode\":\"Office\",\"probationPeriod\":\"3 Months\",\"jobLocation\":\"Bangalore North, India\",\"interviewLocation\":\"Virtual\",\"interviewDate\":\"2025-11-14\",\"interviewRounds\":[\"Round 1: Written Test(Virtual)\",\"Round 2: Online Test(Virtual)\",\"Round 3: HR Screening Telecom (Virtual)\",\"Round 4: Technical Round - 1(Virtual)\",\"Round 5: Technical Round - 2(Virtual)\",\"Round 6: Technical Round - 3(Virtual)\"],\"salaryDetails\":\"₹ 3.6 LPA\\nInternship stipend: ₹15,000-20,000 per month\\nPost-conversion (Full-time): ₹3.6 LPA (Performance based)\",\"qualificationPercentages\":{\"10th\":\"70%\",\"12th\":\"70%\",\"UG\":\"70%\",\"PG\":\"70%\"},\"qualificationCGPA\":{\"UG\":\"7 CGPA\",\"PG\":\"7 CGPA\"},\"genderPreference\":\"None\",\"bondDetails\":\"0 Months\",\"backlog\":\"NOT ALLOWED\"}";

			// Calculate registration deadlines for countdown timers
			LocalDate deadline1 = LocalDate.now().plusDays(7);
			LocalDate deadline2 = LocalDate.now().plusDays(3);
			LocalDate deadline3 = LocalDate.now().plusDays(2);

			List<JobPost> jobs = new ArrayList<>();
			// Jobs matching the image design
			JobPost job1 = new JobPost();
			job1.setPostId(1);
			job1.setCompanyName("NielsenIQ");
			job1.setCompanyLogoText("NIQ");
			job1.setPostProfile("Data Operations");
			job1.setPostDesc(nielsenIQJobDesc);
			job1.setReqExperience(0);
			job1.setPostTechStack(List.of("Communication skills", "MS Excel", "SQL"));
			job1.setPostingDate(today);
			job1.setRegistrationStatus("Reg. Open");
			job1.setRegistrationDeadline(deadline1);
			job1.setApplicationStatus("Not Eligible");
			jobs.add(job1);

			JobPost job2 = new JobPost();
			job2.setPostId(2);
			job2.setCompanyName("LeadSquared");
			job2.setPostProfile("Performance Testing");
			job2.setPostDesc(leadSquaredJobDesc);
			job2.setReqExperience(1);
			job2.setPostTechStack(List.of("Manual testing", "Automation testing", "Selenium", "JIRA", "TestNG", "API Testing", "Postman"));
			job2.setPostingDate(yesterday);
			job2.setRegistrationStatus("Reg. Open");
			job2.setRegistrationDeadline(deadline2);
			job2.setApplicationStatus("Eligible to Apply");
			jobs.add(job2);

			JobPost job3 = new JobPost();
			job3.setPostId(3);
			job3.setCompanyName("Detect Technologies");
			job3.setPostProfile("SOM Engineer");
			job3.setPostDesc(detectTechJobDesc);
			job3.setReqExperience(2);
			job3.setPostTechStack(List.of("Python", "Great communication"));
			job3.setPostingDate(twoDaysAgo);
			job3.setRegistrationStatus("Reg. Open");
			job3.setRegistrationDeadline(deadline3);
			job3.setApplicationStatus("Eligible to Apply");
			jobs.add(job3);

			JobPost job4 = new JobPost();
			job4.setPostId(4);
			job4.setCompanyName("Outbox Labs");
			job4.setPostProfile("Backend Engineer");
			job4.setPostDesc(outboxLabsJobDesc);
			job4.setReqExperience(2);
			job4.setPostTechStack(List.of("NodeJS", "MySQL", "Typescript", "ExpressJS", "MongoDB"));
			job4.setPostingDate(threeDaysAgo);
			job4.setRegistrationStatus("Reg. Closed");
			job4.setRegistrationDeadline(null);
			job4.setApplicationStatus("Eligible to Apply");
			jobs.add(job4);

			JobPost job5 = new JobPost();
			job5.setPostId(5);
			job5.setCompanyName("MRI Software");
			job5.setCompanyLogoText("MRI");
			job5.setPostProfile("Database Administrator");
			job5.setPostDesc(mriJobDesc);
			job5.setReqExperience(3);
			job5.setPostTechStack(List.of("SQL", "Good Communication"));
			job5.setPostingDate(today);
			job5.setRegistrationStatus("In Progress");
			job5.setRegistrationDeadline(null);
			job5.setApplicationStatus("Application Submitted");
			jobs.add(job5);

			JobPost job6 = new JobPost();
			job6.setPostId(6);
			job6.setCompanyName("OmniReach");
			job6.setPostProfile("Junior AI & ML Engineer");
			job6.setPostDesc(omniReachJobDesc);
			job6.setReqExperience(0);
			job6.setPostTechStack(List.of("Python", "SQL", "relational databases", "Machine Learning", "Data Analysis", "Communication skills"));
			job6.setPostingDate(today);
			job6.setRegistrationStatus("Reg. Closed");
			job6.setRegistrationDeadline(null);
			job6.setApplicationStatus("Not Eligible");
			jobs.add(job6);
		
			repo.saveAll(jobs);
			
		}


	public List<JobPost> search(String keyword) {
			return repo.findByPostProfileContainingOrPostDescContaining(keyword,keyword);
	}
}
