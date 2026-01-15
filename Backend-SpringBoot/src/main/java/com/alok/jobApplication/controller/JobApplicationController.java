package com.alok.jobApplication.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alok.jobApplication.model.AppUser;
import com.alok.jobApplication.model.JobApplication;
import com.alok.jobApplication.model.JobPost;
import com.alok.jobApplication.repo.JobApplicationRepo;
import com.alok.jobApplication.repo.JobRepo;
import com.alok.jobApplication.repo.UserRepo;
import com.alok.jobApplication.service.EmailService;

import lombok.Data;

@RestController
@RequestMapping
@CrossOrigin
public class JobApplicationController {

    @Autowired
    private JobApplicationRepo applicationRepo;

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailService emailService;

    /**
     * User: apply to a job
     */
    @PostMapping("/jobPost/{postId}/apply")
    public ResponseEntity<?> applyToJob(@PathVariable int postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication required"));
        }

        String userEmail = authentication.getName();
        Optional<AppUser> userOpt = userRepo.findByEmail(userEmail);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("User not found"));
        }

        AppUser user = userOpt.get();
        if (!user.getRole().equalsIgnoreCase("USER") && !user.getRole().equalsIgnoreCase("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ErrorResponse("Only users can apply to jobs"));
        }

            Optional<JobPost> jobOpt = jobRepo.findById(postId);
            if (jobOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Job not found"));
            }

            JobPost jobPost = jobOpt.get();

            // Check if user already applied
            List<JobApplication> existingApps = applicationRepo.findByJobPostPostIdAndApplicantEmail(
                    postId, user.getEmail());
            if (!existingApps.isEmpty()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse("You have already applied for this job"));
            }

            JobApplication application = new JobApplication();
            application.setJobPost(jobPost);
            application.setApplicantName(user.getName());
            application.setApplicantEmail(user.getEmail());
            application.setResumeUrl(""); // Can be updated later
            application.setStatus("APPLIED");
            application.setAppliedAt(LocalDateTime.now());

            JobApplication saved = applicationRepo.save(application);
            
            // Send email notification to the user
            try {
                emailService.sendApplicationSubmittedEmail(
                    user.getEmail(), 
                    user.getName(), 
                    jobPost.getPostProfile(),
                    jobPost.getCompanyName()
                );
            } catch (Exception e) {
                // Log the error but don't fail the application submission
                System.err.println("Failed to send email notification: " + e.getMessage());
            }
            
            return ResponseEntity.ok(saved);
    }

    /**
     * Admin: view all applications
     */
    @GetMapping("/applications")
    public ResponseEntity<?> getAllApplications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only ADMIN can view applications");
        }
        List<JobApplication> list = applicationRepo.findAll();
        return ResponseEntity.ok(list);
    }

    /**
     * Admin: view applications for a specific job
     */
    @GetMapping("/jobPost/{postId}/applications")
    public ResponseEntity<?> getApplicationsForJob(@PathVariable int postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only ADMIN can view applications");
        }
        List<JobApplication> list = applicationRepo.findByJobPostPostId(postId);
        return ResponseEntity.ok(list);
    }

    /**
     * Admin: update application status
     */
    @PutMapping("/applications/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestBody UpdateStatusRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only ADMIN can update application status");
        }

        Optional<JobApplication> existing = applicationRepo.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Application not found");
        }

        JobApplication app = existing.get();
        app.setStatus(request.getStatus());
        JobApplication saved = applicationRepo.save(app);
        return ResponseEntity.ok(saved);
    }

    @Data
    private static class UpdateStatusRequest {
        private String status;
    }

    @Data
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}


