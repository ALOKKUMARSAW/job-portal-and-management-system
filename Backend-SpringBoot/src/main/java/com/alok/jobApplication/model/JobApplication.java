package com.alok.jobApplication.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private JobPost jobPost;

    private String applicantName;
    private String applicantEmail;
    private String resumeUrl;

    private String status; // e.g. "APPLIED", "REVIEWED", "INTERVIEW", "REJECTED", "SELECTED"

    private LocalDateTime appliedAt;
}


