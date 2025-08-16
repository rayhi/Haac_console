import { pool } from '../config/database.js';
import { hashPassword } from './auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Check if data already exists
    const [existingUsers] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM users');
    if (existingUsers[0].count > 0) {
      console.log('📊 Database already contains data, skipping seed');
      return;
    }

    // Create admin user
    const adminPassword = await hashPassword('Admin123!');
    const [adminResult] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (email, password, first_name, last_name, role, phone, address) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['admin@insurance.com', adminPassword, 'Admin', 'User', 'admin', '+1234567890', '123 Admin St, City, State']
    );

    // Create agent user
    const agentPassword = await hashPassword('Agent123!');
    const [agentResult] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (email, password, first_name, last_name, role, phone, address) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['agent@insurance.com', agentPassword, 'John', 'Agent', 'agent', '+1234567891', '456 Agent Ave, City, State']
    );

    // Create customer users
    const customers = [
      {
        email: 'customer1@example.com',
        password: await hashPassword('Customer123!'),
        first_name: 'Alice',
        last_name: 'Johnson',
        phone: '+1234567892',
        address: '789 Customer Ln, City, State',
        date_of_birth: '1985-03-15',
        gender: 'female',
        occupation: 'Software Engineer',
        annual_income: 75000,
        marital_status: 'married'
      },
      {
        email: 'customer2@example.com',
        password: await hashPassword('Customer123!'),
        first_name: 'Bob',
        last_name: 'Smith',
        phone: '+1234567893',
        address: '321 Customer St, City, State',
        date_of_birth: '1990-07-22',
        gender: 'male',
        occupation: 'Teacher',
        annual_income: 50000,
        marital_status: 'single'
      },
      {
        email: 'customer3@example.com',
        password: await hashPassword('Customer123!'),
        first_name: 'Carol',
        last_name: 'Davis',
        phone: '+1234567894',
        address: '654 Customer Blvd, City, State',
        date_of_birth: '1982-11-08',
        gender: 'female',
        occupation: 'Marketing Manager',
        annual_income: 65000,
        marital_status: 'divorced'
      }
    ];

    const customerIds = [];
    for (const customer of customers) {
      const [userResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO users (email, password, first_name, last_name, role, phone, address) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [customer.email, customer.password, customer.first_name, customer.last_name, 'customer', customer.phone, customer.address]
      );

      const [customerResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO customers (user_id, date_of_birth, gender, occupation, annual_income, marital_status) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userResult.insertId, customer.date_of_birth, customer.gender, customer.occupation, customer.annual_income, customer.marital_status]
      );

      customerIds.push(customerResult.insertId);
    }

    // Create insurance products
    const products = [
      {
        name: 'Basic Life Insurance',
        type: 'life',
        description: 'Basic life insurance coverage for individuals and families',
        base_premium: 50.00,
        coverage_amount: 100000.00,
        term_years: 20
      },
      {
        name: 'Premium Health Insurance',
        type: 'health',
        description: 'Comprehensive health insurance with dental and vision coverage',
        base_premium: 200.00,
        coverage_amount: 500000.00,
        term_years: 1
      },
      {
        name: 'Auto Insurance Standard',
        type: 'auto',
        description: 'Standard auto insurance with collision and comprehensive coverage',
        base_premium: 120.00,
        coverage_amount: 50000.00,
        term_years: 1
      },
      {
        name: 'Home Insurance Plus',
        type: 'home',
        description: 'Complete home insurance with personal property and liability coverage',
        base_premium: 150.00,
        coverage_amount: 300000.00,
        term_years: 1
      },
      {
        name: 'Travel Insurance',
        type: 'travel',
        description: 'International travel insurance with medical and trip cancellation coverage',
        base_premium: 25.00,
        coverage_amount: 25000.00,
        term_years: null
      }
    ];

    const productIds = [];
    for (const product of products) {
      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO insurance_products (name, type, description, base_premium, coverage_amount, term_years) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [product.name, product.type, product.description, product.base_premium, product.coverage_amount, product.term_years]
      );
      productIds.push(result.insertId);
    }

    // Create policies
    const policies = [
      {
        customer_id: customerIds[0],
        product_id: productIds[0], // Life Insurance
        premium_amount: 55.00,
        coverage_amount: 100000.00,
        start_date: '2024-01-01',
        end_date: '2044-01-01',
        payment_frequency: 'monthly',
        agent_id: agentResult.insertId,
        beneficiary_name: 'John Johnson',
        beneficiary_relationship: 'spouse'
      },
      {
        customer_id: customerIds[0],
        product_id: productIds[1], // Health Insurance
        premium_amount: 220.00,
        coverage_amount: 500000.00,
        start_date: '2024-01-01',
        end_date: '2025-01-01',
        payment_frequency: 'monthly',
        agent_id: agentResult.insertId,
        beneficiary_name: null,
        beneficiary_relationship: null
      },
      {
        customer_id: customerIds[1],
        product_id: productIds[2], // Auto Insurance
        premium_amount: 125.00,
        coverage_amount: 50000.00,
        start_date: '2024-02-01',
        end_date: '2025-02-01',
        payment_frequency: 'monthly',
        agent_id: agentResult.insertId,
        beneficiary_name: null,
        beneficiary_relationship: null
      },
      {
        customer_id: customerIds[2],
        product_id: productIds[3], // Home Insurance
        premium_amount: 160.00,
        coverage_amount: 300000.00,
        start_date: '2024-03-01',
        end_date: '2025-03-01',
        payment_frequency: 'quarterly',
        agent_id: agentResult.insertId,
        beneficiary_name: 'Sarah Davis',
        beneficiary_relationship: 'daughter'
      }
    ];

    const policyIds = [];
    for (const policy of policies) {
      // Generate policy number
      const policyNumber = `POL-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO policies (policy_number, customer_id, product_id, premium_amount, coverage_amount, 
         start_date, end_date, payment_frequency, agent_id, beneficiary_name, beneficiary_relationship) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [policyNumber, policy.customer_id, policy.product_id, policy.premium_amount, policy.coverage_amount,
         policy.start_date, policy.end_date, policy.payment_frequency, policy.agent_id, 
         policy.beneficiary_name, policy.beneficiary_relationship]
      );
      policyIds.push(result.insertId);
    }

    // Create sample claims
    const claims = [
      {
        policy_id: policyIds[1], // Health insurance claim
        claim_amount: 2500.00,
        incident_date: '2024-01-15',
        claim_date: '2024-01-17',
        description: 'Emergency room visit for chest pain, including diagnostic tests and treatment',
        status: 'approved',
        settlement_amount: 2200.00,
        settlement_date: '2024-01-25',
        adjuster_id: agentResult.insertId
      },
      {
        policy_id: policyIds[2], // Auto insurance claim
        claim_amount: 4500.00,
        incident_date: '2024-02-10',
        claim_date: '2024-02-12',
        description: 'Vehicle collision resulting in front-end damage and airbag deployment',
        status: 'investigating',
        settlement_amount: null,
        settlement_date: null,
        adjuster_id: agentResult.insertId
      },
      {
        policy_id: policyIds[3], // Home insurance claim
        claim_amount: 8000.00,
        incident_date: '2024-03-05',
        claim_date: '2024-03-07',
        description: 'Water damage from burst pipe in basement affecting flooring and walls',
        status: 'pending',
        settlement_amount: null,
        settlement_date: null,
        adjuster_id: null
      }
    ];

    for (const claim of claims) {
      // Generate claim number
      const claimNumber = `CLM-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      await pool.execute(
        `INSERT INTO claims (claim_number, policy_id, claim_amount, incident_date, claim_date, 
         description, status, settlement_amount, settlement_date, adjuster_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [claimNumber, claim.policy_id, claim.claim_amount, claim.incident_date, claim.claim_date,
         claim.description, claim.status, claim.settlement_amount, claim.settlement_date, claim.adjuster_id]
      );
    }

    // Create sample payments
    const payments = [
      {
        policy_id: policyIds[0],
        amount: 55.00,
        payment_date: '2024-01-01',
        due_date: '2024-01-01',
        status: 'completed',
        payment_method: 'credit_card',
        transaction_id: 'TXN-001-2024'
      },
      {
        policy_id: policyIds[0],
        amount: 55.00,
        payment_date: '2024-02-01',
        due_date: '2024-02-01',
        status: 'completed',
        payment_method: 'credit_card',
        transaction_id: 'TXN-002-2024'
      },
      {
        policy_id: policyIds[1],
        amount: 220.00,
        payment_date: '2024-01-01',
        due_date: '2024-01-01',
        status: 'completed',
        payment_method: 'bank_transfer',
        transaction_id: 'TXN-003-2024'
      },
      {
        policy_id: policyIds[2],
        amount: 125.00,
        payment_date: null,
        due_date: '2024-04-01',
        status: 'pending',
        payment_method: 'credit_card',
        transaction_id: null
      }
    ];

    for (const payment of payments) {
      await pool.execute(
        `INSERT INTO payments (policy_id, amount, payment_date, due_date, status, payment_method, transaction_id) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [payment.policy_id, payment.amount, payment.payment_date, payment.due_date,
         payment.status, payment.payment_method, payment.transaction_id]
      );
    }

    console.log('✅ Database seeded successfully with sample data');
    console.log('📋 Sample accounts created:');
    console.log('   Admin: admin@insurance.com / Admin123!');
    console.log('   Agent: agent@insurance.com / Agent123!');
    console.log('   Customer 1: customer1@example.com / Customer123!');
    console.log('   Customer 2: customer2@example.com / Customer123!');
    console.log('   Customer 3: customer3@example.com / Customer123!');

  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    throw error;
  }
};