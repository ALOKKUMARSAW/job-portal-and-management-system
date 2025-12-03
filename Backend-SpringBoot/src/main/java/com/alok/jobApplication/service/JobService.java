package com.alok.jobApplication.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alok.jobApplication.model.JobPost;
import com.alok.jobApplication.repo.JobRepo;


@Service
public class JobService {

	@Autowired
	public JobRepo repo;
	
	
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
			String deadline1 = LocalDate.now().plusDays(7).atTime(23, 59).format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
			String deadline2 = LocalDate.now().plusDays(3).atTime(23, 59).format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
			String deadline3 = LocalDate.now().plusDays(2).atTime(23, 59).format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));

			List<JobPost> jobs = new ArrayList<>();
			// Jobs matching the image design
			jobs.add(new JobPost(1, "NielsenIQ", "NIQ", "Data Operations", nielsenIQJobDesc, 0, List.of("Communication skills", "MS Excel", "SQL"), today, "Reg. Open", deadline1, "Not Eligible", null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3));
			jobs.add(new JobPost(2, "LeadSquared", null, "Performance Testing", leadSquaredJobDesc, 1, List.of("Manual testing", "Automation testing", "Selenium", "JIRA", "TestNG", "API Testing", "Postman"), yesterday, "Reg. Open", deadline2, "Eligible to Apply", null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3));
			jobs.add(new JobPost(3, "Detect Technologies", null, "SOM Engineer", detectTechJobDesc, 2, List.of("Python", "Great communication"), twoDaysAgo, "Reg. Open", deadline3, "Eligible to Apply", null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3));
			jobs.add(new JobPost(4, "Outbox Labs", null, "Backend Engineer", outboxLabsJobDesc, 2, List.of("NodeJS", "MySQL", "Typescript", "ExpressJS", "MongoDB"), threeDaysAgo, "Reg. Closed", null, "Eligible to Apply", null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3));
			jobs.add(new JobPost(5, "MRI Software", "MRI", "Database Administrator", mriJobDesc, 3, List.of("SQL", "Good Communication"), today, "In Progress", null, "Application Submitted", null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3));
			jobs.add(new JobPost(6, "OmniReach", null, "Junior AI & ML Engineer", omniReachJobDesc, 0, List.of("Python", "SQL", "relational databases", "Machine Learning", "Data Analysis", "Communication skills"), today, "Reg. Closed", null, "Not Eligible", null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, null, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3, deadline3));
		
			repo.saveAll(jobs);
			
		}


	public List<JobPost> search(String keyword) {
			return repo.findByPostProfileContainingOrPostDescContaining(keyword,keyword);
	}
}
