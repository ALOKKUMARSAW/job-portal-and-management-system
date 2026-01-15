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
import com.alok.jobApplication.util.JwtUtil;
import com.alok.jobApplication.enums.Role;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Data;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        System.out.println("=== REGISTER ENDPOINT CALLED ===");
        System.out.println("Request method: POST");
        System.out.println("Request path: /auth/register");
        try {
            System.out.println("Registration request received: " + request);
            
            if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().isBlank()
                || request.getRole() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Name, email, password and role are required"));
        }

            Optional<AppUser> existing = userRepo.findByEmail(request.getEmail());
            if (existing.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse("Email already exists"));
            }

            String role = request.getRole() == Role.ADMIN ? "ADMIN" : "USER";

            // Hash the password before storing
            String encodedPassword = passwordEncoder.encode(request.getPassword());
            AppUser user = new AppUser(null, request.getName(), request.getEmail(), encodedPassword, role);
            AppUser saved = userRepo.save(user);
            
            System.out.println("User saved successfully: " + saved);

            AuthResponse response = new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), null);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Registration error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<AppUser> existing = userRepo.findByEmail(request.getEmail());
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        }

        AppUser user = existing.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());
        AuthResponse response = new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), token);
        return ResponseEntity.ok(response);
    }

    @Data
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        /**
         * USER or ADMIN
         */
        private Role role;
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class AuthResponse {
        private Long id;
        private String name;
        private String email;
        private String role;
        private String token;

        public AuthResponse(Long id, String name, String email, String role, String token) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
            this.token = token;
        }
    }

    @Data
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}


