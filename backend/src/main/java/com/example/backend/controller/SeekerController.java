package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.backend.service.SeekerService;
import com.example.backend.dto.SeekerProfileDto;
import java.util.Map;

@RestController
@RequestMapping("/api/seeker")
@CrossOrigin(origins = "*")
public class SeekerController {
    
    private final SeekerService seekerService;

    public SeekerController(SeekerService seekerService) {
        this.seekerService = seekerService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(seekerService.getProfile(userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfile(@RequestBody SeekerProfileDto dto,
                                         @RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(seekerService.saveProfile(dto, userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/jobs/feed")
    public ResponseEntity<?> getFeed() {
        return ResponseEntity.ok(seekerService.getFeed());
    }

    @GetMapping("/jobs/recommendations")
    public ResponseEntity<?> getRecommendations(@RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(seekerService.getRecommendations(userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/jobs/{id}/apply")
    public ResponseEntity<?> applyJob(@PathVariable Long id,
                                      @RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(seekerService.applyJob(id, userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/applications")
    public ResponseEntity<?> getApplications(@RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(seekerService.getApplications(userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getNotifications(@RequestHeader(value = "X-User-Phone", required = false) String userPhone) {
        try {
            return ResponseEntity.ok(seekerService.getNotifications(userPhone));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/jobs/{id}/report")
    public java.util.concurrent.CompletableFuture<ResponseEntity<?>> reportJob(@PathVariable Long id) {
        return seekerService.reportJob(id).thenApply(result -> 
            ResponseEntity.ok(Map.of("message", "Job has been flagged to trust safety team asynchronously."))
        );
    }
}
