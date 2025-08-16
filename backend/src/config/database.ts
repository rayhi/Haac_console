import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'insurance_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Initialize database schema
export const initializeDatabase = async (): Promise<void> => {
  try {
    await createTables();
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

const createTables = async (): Promise<void> => {
  const queries = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      role ENUM('admin', 'agent', 'customer') DEFAULT 'customer',
      phone VARCHAR(20),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE
    )`,

    // Customers table (extends users)
    `CREATE TABLE IF NOT EXISTS customers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT UNIQUE,
      date_of_birth DATE,
      gender ENUM('male', 'female', 'other'),
      occupation VARCHAR(100),
      annual_income DECIMAL(15,2),
      marital_status ENUM('single', 'married', 'divorced', 'widowed'),
      emergency_contact_name VARCHAR(100),
      emergency_contact_phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    // Insurance products table
    `CREATE TABLE IF NOT EXISTS insurance_products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      type ENUM('life', 'health', 'auto', 'home', 'travel') NOT NULL,
      description TEXT,
      base_premium DECIMAL(10,2) NOT NULL,
      coverage_amount DECIMAL(15,2) NOT NULL,
      term_years INT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    // Policies table
    `CREATE TABLE IF NOT EXISTS policies (
      id INT PRIMARY KEY AUTO_INCREMENT,
      policy_number VARCHAR(50) UNIQUE NOT NULL,
      customer_id INT NOT NULL,
      product_id INT NOT NULL,
      premium_amount DECIMAL(10,2) NOT NULL,
      coverage_amount DECIMAL(15,2) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      status ENUM('active', 'expired', 'cancelled', 'suspended') DEFAULT 'active',
      payment_frequency ENUM('monthly', 'quarterly', 'semi-annual', 'annual') DEFAULT 'monthly',
      agent_id INT,
      beneficiary_name VARCHAR(255),
      beneficiary_relationship VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES insurance_products(id),
      FOREIGN KEY (agent_id) REFERENCES users(id)
    )`,

    // Claims table
    `CREATE TABLE IF NOT EXISTS claims (
      id INT PRIMARY KEY AUTO_INCREMENT,
      claim_number VARCHAR(50) UNIQUE NOT NULL,
      policy_id INT NOT NULL,
      claim_amount DECIMAL(15,2) NOT NULL,
      incident_date DATE NOT NULL,
      claim_date DATE NOT NULL,
      description TEXT NOT NULL,
      status ENUM('pending', 'investigating', 'approved', 'rejected', 'paid') DEFAULT 'pending',
      settlement_amount DECIMAL(15,2),
      settlement_date DATE,
      adjuster_id INT,
      documents JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (policy_id) REFERENCES policies(id) ON DELETE CASCADE,
      FOREIGN KEY (adjuster_id) REFERENCES users(id)
    )`,

    // Payments table
    `CREATE TABLE IF NOT EXISTS payments (
      id INT PRIMARY KEY AUTO_INCREMENT,
      policy_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      payment_date DATE NOT NULL,
      due_date DATE NOT NULL,
      status ENUM('pending', 'completed', 'failed', 'overdue') DEFAULT 'pending',
      payment_method ENUM('credit_card', 'bank_transfer', 'check', 'cash') DEFAULT 'credit_card',
      transaction_id VARCHAR(255),
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (policy_id) REFERENCES policies(id) ON DELETE CASCADE
    )`,

    // Service providers table
    `CREATE TABLE IF NOT EXISTS service_providers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      type ENUM('hospital', 'clinic', 'pharmacy', 'diagnostic_center', 'specialist', 'repair_shop', 'contractor', 'towing_service', 'rental_company') NOT NULL,
      category ENUM('health', 'auto', 'property', 'general') NOT NULL,
      license_number VARCHAR(100),
      tax_id VARCHAR(50),
      contact_person VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(20),
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      zip_code VARCHAR(20),
      country VARCHAR(100) DEFAULT 'US',
      website VARCHAR(255),
      specialties JSON,
      certifications JSON,
      network_status ENUM('in_network', 'out_of_network', 'pending', 'suspended') DEFAULT 'pending',
      contract_start_date DATE,
      contract_end_date DATE,
      reimbursement_rate DECIMAL(5,2),
      quality_rating DECIMAL(3,2),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    // Provider networks table (for managing different networks)
    `CREATE TABLE IF NOT EXISTS provider_networks (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      type ENUM('health', 'auto', 'property', 'general') NOT NULL,
      description TEXT,
      coverage_area JSON,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,

    // Provider network associations
    `CREATE TABLE IF NOT EXISTS provider_network_associations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      provider_id INT NOT NULL,
      network_id INT NOT NULL,
      effective_date DATE NOT NULL,
      termination_date DATE,
      reimbursement_rate DECIMAL(5,2),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (provider_id) REFERENCES service_providers(id) ON DELETE CASCADE,
      FOREIGN KEY (network_id) REFERENCES provider_networks(id) ON DELETE CASCADE,
      UNIQUE KEY unique_provider_network (provider_id, network_id)
    )`,

    // Provider services offered
    `CREATE TABLE IF NOT EXISTS provider_services (
      id INT PRIMARY KEY AUTO_INCREMENT,
      provider_id INT NOT NULL,
      service_code VARCHAR(50) NOT NULL,
      service_name VARCHAR(255) NOT NULL,
      service_category VARCHAR(100),
      standard_fee DECIMAL(10,2),
      negotiated_fee DECIMAL(10,2),
      is_covered BOOLEAN DEFAULT TRUE,
      requires_authorization BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (provider_id) REFERENCES service_providers(id) ON DELETE CASCADE
    )`,

    // Claims-provider relationships
    `CREATE TABLE IF NOT EXISTS claim_providers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      claim_id INT NOT NULL,
      provider_id INT NOT NULL,
      service_date DATE NOT NULL,
      services_provided JSON,
      billed_amount DECIMAL(15,2) NOT NULL,
      approved_amount DECIMAL(15,2),
      payment_status ENUM('pending', 'approved', 'paid', 'denied') DEFAULT 'pending',
      payment_date DATE,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (claim_id) REFERENCES claims(id) ON DELETE CASCADE,
      FOREIGN KEY (provider_id) REFERENCES service_providers(id)
    )`,

    // Audit log table
    `CREATE TABLE IF NOT EXISTS audit_logs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      action VARCHAR(100) NOT NULL,
      table_name VARCHAR(100) NOT NULL,
      record_id INT,
      old_values JSON,
      new_values JSON,
      ip_address VARCHAR(45),
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`
  ];

  for (const query of queries) {
    await pool.execute(query);
  }
};

export default pool;