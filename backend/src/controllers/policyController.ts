import { Response } from 'express';
import { validationResult } from 'express-validator';
import { pool } from '../config/database.js';
import { Policy, ApiResponse, PaginatedResponse } from '../types/index.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { generatePolicyNumber } from '../utils/auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const createPolicy = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: errors.array()
      });
      return;
    }

    const { customer_id, product_id, premium_amount, coverage_amount, start_date, end_date, payment_frequency, beneficiary_name, beneficiary_relationship } = req.body;
    const agent_id = req.user?.id;
    const policy_number = generatePolicyNumber();

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO policies (policy_number, customer_id, product_id, premium_amount, coverage_amount, 
       start_date, end_date, payment_frequency, agent_id, beneficiary_name, beneficiary_relationship)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [policy_number, customer_id, product_id, premium_amount, coverage_amount, start_date, end_date, payment_frequency, agent_id, beneficiary_name, beneficiary_relationship]
    );

    const response: ApiResponse<{ policy_id: number; policy_number: string }> = {
      success: true,
      message: 'Policy created successfully',
      data: { policy_id: result.insertId, policy_number }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to create policy'
    });
  }
};

export const getPolicies = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const customer_id = req.query.customer_id as string;

    let whereClause = '';
    const queryParams: any[] = [];

    if (req.user?.role === 'customer') {
      whereClause = 'WHERE p.customer_id = (SELECT id FROM customers WHERE user_id = ?)';
      queryParams.push(req.user.id);
    } else {
      whereClause = 'WHERE 1=1';
    }

    if (status) {
      whereClause += ' AND p.status = ?';
      queryParams.push(status);
    }

    if (customer_id && req.user?.role !== 'customer') {
      whereClause += ' AND p.customer_id = ?';
      queryParams.push(customer_id);
    }

    const [policies] = await pool.execute<RowDataPacket[]>(
      `SELECT p.*, 
              CONCAT(u.first_name, ' ', u.last_name) as customer_name,
              u.email as customer_email,
              ip.name as product_name,
              ip.type as product_type,
              CONCAT(agent.first_name, ' ', agent.last_name) as agent_name
       FROM policies p
       JOIN customers c ON p.customer_id = c.id
       JOIN users u ON c.user_id = u.id
       JOIN insurance_products ip ON p.product_id = ip.id
       LEFT JOIN users agent ON p.agent_id = agent.id
       ${whereClause}
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    const [countResult] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as total
       FROM policies p
       JOIN customers c ON p.customer_id = c.id
       JOIN users u ON c.user_id = u.id
       ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const response: ApiResponse<PaginatedResponse<Policy>> = {
      success: true,
      message: 'Policies retrieved successfully',
      data: {
        data: policies as Policy[],
        pagination: { page, limit, total, totalPages }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get policies error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve policies'
    });
  }
};

export const getPolicyById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    let whereClause = 'WHERE p.id = ?';
    const queryParams: any[] = [id];

    if (req.user?.role === 'customer') {
      whereClause += ' AND p.customer_id = (SELECT id FROM customers WHERE user_id = ?)';
      queryParams.push(req.user.id);
    }

    const [policies] = await pool.execute<RowDataPacket[]>(
      `SELECT p.*, 
              CONCAT(u.first_name, ' ', u.last_name) as customer_name,
              u.email as customer_email,
              u.phone as customer_phone,
              u.address as customer_address,
              c.date_of_birth, c.gender, c.occupation,
              ip.name as product_name,
              ip.type as product_type,
              ip.description as product_description,
              CONCAT(agent.first_name, ' ', agent.last_name) as agent_name,
              agent.email as agent_email
       FROM policies p
       JOIN customers c ON p.customer_id = c.id
       JOIN users u ON c.user_id = u.id
       JOIN insurance_products ip ON p.product_id = ip.id
       LEFT JOIN users agent ON p.agent_id = agent.id
       ${whereClause}`,
      queryParams
    );

    if (policies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
      return;
    }

    const response: ApiResponse<Policy> = {
      success: true,
      message: 'Policy retrieved successfully',
      data: policies[0] as Policy
    };

    res.json(response);
  } catch (error) {
    console.error('Get policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve policy'
    });
  }
};

export const updatePolicy = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: errors.array()
      });
      return;
    }

    const { id } = req.params;
    const { premium_amount, coverage_amount, status, payment_frequency, beneficiary_name, beneficiary_relationship } = req.body;

    // Check if policy exists and user has permission
    let whereClause = 'WHERE id = ?';
    const checkParams: any[] = [id];

    if (req.user?.role === 'customer') {
      whereClause += ' AND customer_id = (SELECT id FROM customers WHERE user_id = ?)';
      checkParams.push(req.user.id);
    }

    const [existingPolicy] = await pool.execute<RowDataPacket[]>(
      `SELECT id FROM policies ${whereClause}`,
      checkParams
    );

    if (existingPolicy.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Policy not found or access denied'
      });
      return;
    }

    await pool.execute(
      `UPDATE policies SET 
       premium_amount = ?, coverage_amount = ?, status = ?, payment_frequency = ?,
       beneficiary_name = ?, beneficiary_relationship = ?
       WHERE id = ?`,
      [premium_amount, coverage_amount, status, payment_frequency, beneficiary_name, beneficiary_relationship, id]
    );

    const response: ApiResponse = {
      success: true,
      message: 'Policy updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Update policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to update policy'
    });
  }
};