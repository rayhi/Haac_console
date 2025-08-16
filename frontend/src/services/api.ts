import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'agent' | 'customer';
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
  phone?: string;
  address?: string;
}

// Policy Types
export interface Policy {
  id: number;
  policy_number: string;
  customer_id: number;
  product_id: number;
  premium_amount: number;
  coverage_amount: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'suspended';
  payment_frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  agent_id?: number;
  beneficiary_name?: string;
  beneficiary_relationship?: string;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  customer_email?: string;
  product_name?: string;
  product_type?: string;
  agent_name?: string;
}

// Claim Types
export interface Claim {
  id: number;
  claim_number: string;
  policy_id: number;
  claim_amount: number;
  incident_date: string;
  claim_date: string;
  description: string;
  status: 'pending' | 'investigating' | 'approved' | 'rejected' | 'paid';
  settlement_amount?: number;
  settlement_date?: string;
  adjuster_id?: number;
  created_at: string;
  updated_at: string;
  policy_number?: string;
  customer_name?: string;
  customer_email?: string;
  product_name?: string;
  product_type?: string;
  adjuster_name?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalPolicies: number;
  activePolicies: number;
  totalClaims: number;
  pendingClaims: number;
  totalCustomers: number;
  totalPremiumCollected: number;
  recentPolicies: Policy[];
  recentClaims: Claim[];
}

// API Service Class
class ApiService {
  // Authentication APIs
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data!;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return response.data.data!;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data.data!;
  }

  async updateProfile(userData: Partial<User>): Promise<void> {
    await api.put<ApiResponse>('/auth/profile', userData);
  }

  async changePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<void> {
    await api.put<ApiResponse>('/auth/change-password', passwordData);
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data!;
  }

  async getMonthlyStats(): Promise<{ monthlyPolicies: any[]; monthlyClaims: any[] }> {
    const response = await api.get<ApiResponse<{ monthlyPolicies: any[]; monthlyClaims: any[] }>>('/dashboard/monthly-stats');
    return response.data.data!;
  }

  // Policy APIs
  async getPolicies(params?: {
    page?: number;
    limit?: number;
    status?: string;
    customer_id?: string;
  }): Promise<PaginatedResponse<Policy>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Policy>>>('/policies', { params });
    return response.data.data!;
  }

  async getPolicyById(id: number): Promise<Policy> {
    const response = await api.get<ApiResponse<Policy>>(`/policies/${id}`);
    return response.data.data!;
  }

  async createPolicy(policyData: Partial<Policy>): Promise<{ policy_id: number; policy_number: string }> {
    const response = await api.post<ApiResponse<{ policy_id: number; policy_number: string }>>('/policies', policyData);
    return response.data.data!;
  }

  async updatePolicy(id: number, policyData: Partial<Policy>): Promise<void> {
    await api.put<ApiResponse>(`/policies/${id}`, policyData);
  }

  // Claim APIs
  async getClaims(params?: {
    page?: number;
    limit?: number;
    status?: string;
    policy_id?: string;
  }): Promise<PaginatedResponse<Claim>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Claim>>>('/claims', { params });
    return response.data.data!;
  }

  async createClaim(claimData: Partial<Claim>): Promise<{ claim_id: number; claim_number: string }> {
    const response = await api.post<ApiResponse<{ claim_id: number; claim_number: string }>>('/claims', claimData);
    return response.data.data!;
  }

  async updateClaimStatus(id: number, statusData: {
    status: string;
    settlement_amount?: number;
    adjuster_id?: number;
  }): Promise<void> {
    await api.put<ApiResponse>(`/claims/${id}/status`, statusData);
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default api;