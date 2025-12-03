package com.alok.jobApplication.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alok.jobApplication.model.AppUser;
import com.alok.jobApplication.repo.UserRepo;

import lombok.Data;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()
                || request.getRole() == null || request.getRole().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Name, email, password and role are required"));
        }

        Optional<AppUser> existing = userRepo.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email already exists"));
        }

        String role = request.getRole().equalsIgnoreCase("ADMIN") ? "ADMIN" : "USER";

        // NOTE: For simplicity, password is stored as plain text.
        // In production, ALWAYS hash passwords (e.g. BCrypt).
        AppUser user = new AppUser(null, request.getName(), request.getEmail(), request.getPassword(), role);
        AppUser saved = userRepo.save(user);

        AuthResponse response = new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<AppUser> existing = userRepo.findByEmail(request.getEmail());
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        }

        AppUser user = existing.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        }

        AuthResponse response = new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(response);
    }

    @Data
    private static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        /**
         * "USER" or "ADMIN"
         */
        private String role;
    }

    @Data
    private static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    private static class AuthResponse {
        private Long id;
        private String name;
        private String email;
        private String role;

        public AuthResponse(Long id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }
    }

    @Data
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}


