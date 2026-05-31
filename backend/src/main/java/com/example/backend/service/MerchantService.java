package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.dto.MerchantProfileDto;
import com.example.backend.dto.JobDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Service
public class MerchantService {

    private final MerchantProfileRepository merchantProfileRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public MerchantService(MerchantProfileRepository merchantProfileRepository, 
                         JobRepository jobRepository, 
                         ApplicationRepository applicationRepository,
                         UserRepository userRepository) {
        this.merchantProfileRepository = merchantProfileRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(String userPhone) {
        if (userPhone == null || userPhone.trim().isEmpty()) {
            throw new RuntimeException("Authentication header X-User-Phone is missing");
        }
        String cleaned = userPhone.replaceAll("\\D", "");
        if (cleaned.length() == 12 && cleaned.startsWith("91")) {
            cleaned = cleaned.substring(2);
        } else if (cleaned.length() == 11 && cleaned.startsWith("1")) {
            cleaned = cleaned.substring(1);
        }
        final String searchPhone = cleaned;
        return userRepository.findByPhoneNumber(searchPhone)
                .orElseThrow(() -> new RuntimeException("User not found for phone: " + searchPhone));
    }

    public MerchantProfile verifyShop(MerchantProfileDto dto, String userPhone) {
        User user = getAuthenticatedUser(userPhone);
        MerchantProfile profile = merchantProfileRepository.findByUserId(user.getId());
        if (profile == null) {
            profile = new MerchantProfile();
            profile.setUser(user);
            profile.setTrustScore(90); // Default trust score
        }
        profile.setShopName(dto.getShopName());
        profile.setAddressLocation(dto.getAddressLocation());
        profile.setVerified(true); 

        return merchantProfileRepository.save(profile);
    }

    public Job postJob(JobDto dto, String userPhone) {
        User user = getAuthenticatedUser(userPhone);
        MerchantProfile profile = merchantProfileRepository.findByUserId(user.getId());
        if (profile == null) {
            throw new RuntimeException("Merchant profile not found. Please verify shop first.");
        }

        Job job = new Job();
        job.setMerchant(profile);
        job.setRoleTitle(dto.getRoleTitle());
        job.setDescription(dto.getDescription());
        job.setShiftTiming(dto.getShiftTiming());
        job.setSalary(dto.getSalary());
        job.setEducationRequirement(dto.getEducationRequirement());
        job.setOpenSlots(dto.getOpenSlots());
        job.setActive(true);

        return jobRepository.save(job);
    }

    public Map<String, Object> fetchDashboard(String userPhone) {
        User user = getAuthenticatedUser(userPhone);
        MerchantProfile profile = merchantProfileRepository.findByUserId(user.getId());
        if (profile == null) {
            return Map.of(
                "activeJobs", 0,
                "totalApplicants", 0,
                "hiredCount", 0,
                "trustScore", 90
            );
        }

        List<Job> activeJobs = jobRepository.findByMerchantId(profile.getId());
        int totalApplicants = 0;
        int hiredCount = 0;
        
        for (Job job : activeJobs) {
            List<Application> apps = applicationRepository.findByJobId(job.getId());
            totalApplicants += apps.size();
            hiredCount += apps.stream().filter(a -> a.getStatus() == Application.AppStatus.HIRED).count();
        }

        return Map.of(
            "activeJobs", activeJobs.size(),
            "totalApplicants", totalApplicants,
            "hiredCount", hiredCount,
            "trustScore", profile.getTrustScore()
        );
    }

    public List<Application> fetchApplicants(String userPhone) {
        User user = getAuthenticatedUser(userPhone);
        MerchantProfile profile = merchantProfileRepository.findByUserId(user.getId());
        if (profile == null) {
            return List.of();
        }

        List<Job> activeJobs = jobRepository.findByMerchantId(profile.getId());
        List<Application> allApplicants = new ArrayList<>();
        
        for (Job job : activeJobs) {
            List<Application> apps = applicationRepository.findByJobId(job.getId());
            allApplicants.addAll(apps);
        }

        return allApplicants;
    }

    public Application updateApplicationStatus(Long applicationId, String status, String userPhone) {
        User user = getAuthenticatedUser(userPhone);
        MerchantProfile profile = merchantProfileRepository.findByUserId(user.getId());
        if (profile == null) {
            throw new RuntimeException("Merchant profile not found");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getJob().getMerchant().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized application update");
        }

        try {
            Application.AppStatus newStatus = Application.AppStatus.valueOf(status.toUpperCase());
            application.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }

        return applicationRepository.save(application);
    }
}
