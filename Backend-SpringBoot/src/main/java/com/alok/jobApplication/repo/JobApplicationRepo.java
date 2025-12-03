package com.alok.jobApplication.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alok.jobApplication.model.JobApplication;

@Repository
public interface JobApplicationRepo extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByJobPostPostId(int postId);

    List<JobApplication> findByJobPostPostIdAndApplicantEmail(int postId, String applicantEmail);
}


