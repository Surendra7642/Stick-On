const BASE_URL = 'http://localhost:8080/api';

const getHeaders = () => {
  const phone = localStorage.getItem('userPhone') || '';
  return {
    'Content-Type': 'application/json',
    'X-User-Phone': phone
  };
};

export const api = {
  // Auth Endpoints
  sendOtp: async (phoneNumber, flowType) => {
    const res = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, flowType })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
    return data;
  },

  verifyOtp: async (phoneNumber, otp, flowType, role) => {
    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp, flowType, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');
    return data;
  },

  // Seeker Endpoints
  saveSeekerProfile: async (profileData) => {
    const res = await fetch(`${BASE_URL}/seeker/profile`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save profile');
    return data;
  },

  getSeekerProfile: async () => {
    const res = await fetch(`${BASE_URL}/seeker/profile`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (res.status === 400 || res.status === 404) {
      // Profile not setup yet
      return null;
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
    return data;
  },

  fetchRecommendations: async () => {
    const res = await fetch(`${BASE_URL}/seeker/jobs/recommendations`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch job recommendations');
    return data;
  },

  applyJob: async (jobId) => {
    const res = await fetch(`${BASE_URL}/seeker/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to apply for job');
    return data;
  },

  reportJob: async (jobId) => {
    const res = await fetch(`${BASE_URL}/seeker/jobs/${jobId}/report`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to report job');
    return data;
  },

  fetchMyApplications: async () => {
    const res = await fetch(`${BASE_URL}/seeker/applications`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch applications');
    return data;
  },

  fetchNotifications: async () => {
    const res = await fetch(`${BASE_URL}/seeker/notifications`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch notifications');
    return data;
  },

  // Merchant Endpoints
  verifyMerchantShop: async (shopData) => {
    const res = await fetch(`${BASE_URL}/merchant/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(shopData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to verify shop');
    return data;
  },

  postMerchantJob: async (jobData) => {
    const res = await fetch(`${BASE_URL}/merchant/jobs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(jobData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to post job');
    return data;
  },

  fetchMerchantDashboard: async () => {
    const res = await fetch(`${BASE_URL}/merchant/dashboard`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch dashboard');
    return data;
  },

  fetchMerchantApplicants: async () => {
    const res = await fetch(`${BASE_URL}/merchant/applicants`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch applicants');
    return data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const res = await fetch(`${BASE_URL}/merchant/applications/${applicationId}/status`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update application status');
    return data;
  }
};
