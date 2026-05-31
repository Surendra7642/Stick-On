package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.service.AuthService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
        try {
            String phone = payload.get("phoneNumber");
            String flowType = payload.get("flowType");
            String otp = authService.sendOtp(phone, flowType);
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully", "otp", otp));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.verifyOtp(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
