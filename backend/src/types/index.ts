export interface User {
  id?: number;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'agent' | 'customer';
  phone?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
}

export interface Customer {
  id?: number;
  user_id: number;
  date_of_birth?: Date;
  gender?: 'male' | 'female' | 'other';
  occupation?: string;
  annual_income?: number;
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed';
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at?: Date;
  updated_at?: Date;
  user?: User;
}

export interface InsuranceProduct {
  id?: number;
  name: string;
  type: 'life' | 'health' | 'auto' | 'home' | 'travel';
  description?: string;
  base_premium: number;
  coverage_amount: number;
  term_years?: number;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Policy {
  id?: number;
  policy_number: string;
  customer_id: number;
  product_id: number;
  premium_amount: number;
  coverage_amount: number;
  start_date: Date;
  end_date: Date;
  status?: 'active' | 'expired' | 'cancelled' | 'suspended';
  payment_frequency?: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  agent_id?: number;
  beneficiary_name?: string;
  beneficiary_relationship?: string;
  created_at?: Date;
  updated_at?: Date;
  customer?: Customer;
  product?: InsuranceProduct;
  agent?: User;
}

export interface Claim {
  id?: number;
  claim_number: string;
  policy_id: number;
  claim_amount: number;
  incident_date: Date;
  claim_date: Date;
  description: string;
  status?: 'pending' | 'investigating' | 'approved' | 'rejected' | 'paid';
  settlement_amount?: number;
  settlement_date?: Date;
  adjuster_id?: number;
  documents?: any;
  created_at?: Date;
  updated_at?: Date;
  policy?: Policy;
  adjuster?: User;
}

export interface Payment {
  id?: number;
  policy_id: number;
  amount: number;
  payment_date: Date;
  due_date: Date;
  status?: 'pending' | 'completed' | 'failed' | 'overdue';
  payment_method?: 'credit_card' | 'bank_transfer' | 'check' | 'cash';
  transaction_id?: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
  policy?: Policy;
}

export interface AuditLog {
  id?: number;
  user_id?: number;
  action: string;
  table_name: string;
  record_id?: number;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at?: Date;
  user?: User;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
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