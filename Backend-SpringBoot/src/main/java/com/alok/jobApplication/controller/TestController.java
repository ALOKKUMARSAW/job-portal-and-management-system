package com.alok.jobApplication.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Application is running");
    }

    @GetMapping("/auth")
    public ResponseEntity<String> authTest() {
        return ResponseEntity.ok("Auth endpoint accessible");
    }
}
