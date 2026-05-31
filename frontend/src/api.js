const BASE_URL = 'http://localhost:8080/api';

/**
 * Helper function to simulate backend delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Seeker Endpoints
  saveSeekerProfile: async (profileData) => {
    console.log("Mocking POST /seeker/profile with data:", profileData);
    await delay(800); // simulate network latency
    return { message: "Profile saved successfully", profileId: 1 };
  },

  // Merchant Endpoints
  fetchMerchantDashboard: async () => {
    console.log("Mocking GET /merchant/dashboard");
    await delay(1000); // simulate network latency
    return {
      activeJobs: 12,
      totalApplicants: 89,
      hiredCount: 5,
      trustScore: 92
    };
  },

  postMerchantJob: async (jobData) => {
    console.log("Mocking POST /merchant/jobs with data:", jobData);
    await delay(1200); // simulate network latency
    return { message: "Job posted successfully", jobId: 101 };
  },
};
