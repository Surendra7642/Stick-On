package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.backend.service.MerchantService;
import com.example.backend.dto.MerchantProfileDto;
import com.example.backend.dto.JobDto;
import java.util.Map;

@RestController
@RequestMapping("/api/merchant")
@CrossOrigin(origins = "*")
public class MerchantController {
    
    private final MerchantService merchantService;

    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyShop(@RequestBody MerchantProfileDto dto,
                                        @RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(merchantService.verifyShop(dto, userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/jobs")
    public ResponseEntity<?> postJob(@RequestBody JobDto dto,
                                     @RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(merchantService.postJob(dto, userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> fetchDashboard(@RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(merchantService.fetchDashboard(userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/applicants")
    public ResponseEntity<?> fetchApplicants(@RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(merchantService.fetchApplicants(userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/applications/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id,
                                                     @RequestBody Map<String, String> payload,
                                                     @RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            String status = payload.get("status");
            return ResponseEntity.ok(merchantService.updateApplicationStatus(id, status, userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
