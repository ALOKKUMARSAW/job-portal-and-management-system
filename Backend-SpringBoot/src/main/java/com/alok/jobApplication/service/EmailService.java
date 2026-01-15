package com.alok.jobApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendApplicationSubmittedEmail(String toEmail, String applicantName, String jobTitle, String companyName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Application Submitted Successfully");
        message.setText("Dear " + applicantName + ",\n\n" +
                "Your application for the position of " + jobTitle + " at " + companyName + " has been successfully submitted.\n\n" +
                "We will review your application and get back to you soon.\n\n" +
                "Best regards,\n" +
                "Job Portal Team");
        
        mailSender.send(message);
    }
}
