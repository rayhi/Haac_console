import { Response } from 'express';
import { validationResult } from 'express-validator';
import { pool } from '../config/database.js';
import { Claim, ApiResponse, PaginatedResponse } from '../types/index.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { generateClaimNumber } from '../utils/auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const createClaim = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

    const { policy_id, claim_amount, incident_date, description } = req.body;
    const claim_number = generateClaimNumber();
    const claim_date = new Date().toISOString().split('T')[0];

    // Verify policy exists and belongs to customer (if customer role)
    let policyCheck = 'SELECT id FROM policies WHERE id = ?';
    const policyParams: any[] = [policy_id];

    if (req.user?.role === 'customer') {
      policyCheck += ' AND customer_id = (SELECT id FROM customers WHERE user_id = ?)';
      policyParams.push(req.user.id);
    }

    const [policyExists] = await pool.execute<RowDataPacket[]>(policyCheck, policyParams);

    if (policyExists.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Policy not found or access denied'
      });
      return;
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO claims (claim_number, policy_id, claim_amount, incident_date, claim_date, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [claim_number, policy_id, claim_amount, incident_date, claim_date, description]
    );

    const response: ApiResponse<{ claim_id: number; claim_number: string }> = {
      success: true,
      message: 'Claim created successfully',
      data: { claim_id: result.insertId, claim_number }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Create claim error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to create claim'
    });
  }
};

export const getClaims = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const policy_id = req.query.policy_id as string;

    let whereClause = '';
    const queryParams: any[] = [];

    if (req.user?.role === 'customer') {
      whereClause = 'WHERE p.customer_id = (SELECT id FROM customers WHERE user_id = ?)';
      queryParams.push(req.user.id);
    } else {
      whereClause = 'WHERE 1=1';
    }

    if (status) {
      whereClause += ' AND c.status = ?';
      queryParams.push(status);
    }

    if (policy_id) {
      whereClause += ' AND c.policy_id = ?';
      queryParams.push(policy_id);
    }

    const [claims] = await pool.execute<RowDataPacket[]>(
      `SELECT c.*, 
              p.policy_number,
              CONCAT(u.first_name, ' ', u.last_name) as customer_name,
              u.email as customer_email,
              ip.name as product_name,
              ip.type as product_type,
              CONCAT(adjuster.first_name, ' ', adjuster.last_name) as adjuster_name
       FROM claims c
       JOIN policies p ON c.policy_id = p.id
       JOIN customers cust ON p.customer_id = cust.id
       JOIN users u ON cust.user_id = u.id
       JOIN insurance_products ip ON p.product_id = ip.id
       LEFT JOIN users adjuster ON c.adjuster_id = adjuster.id
       ${whereClause}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    const [countResult] = await pool.execute<RowDataPacket[]>(
      `SELECT COUNT(*) as total
       FROM claims c
       JOIN policies p ON c.policy_id = p.id
       JOIN customers cust ON p.customer_id = cust.id
       JOIN users u ON cust.user_id = u.id
       ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const response: ApiResponse<PaginatedResponse<Claim>> = {
      success: true,
      message: 'Claims retrieved successfully',
      data: {
        data: claims as Claim[],
        pagination: { page, limit, total, totalPages }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get claims error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve claims'
    });
  }
};

export const updateClaimStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, settlement_amount, adjuster_id } = req.body;

    // Only admin and agents can update claim status
    if (req.user?.role === 'customer') {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions to update claim status'
      });
      return;
    }

    const updateData: any = { status };
    const updateFields = ['status = ?'];
    const updateValues = [status];

    if (settlement_amount !== undefined) {
      updateData.settlement_amount = settlement_amount;
      updateFields.push('settlement_amount = ?');
      updateValues.push(settlement_amount);
    }

    if (adjuster_id !== undefined) {
      updateData.adjuster_id = adjuster_id;
      updateFields.push('adjuster_id = ?');
      updateValues.push(adjuster_id);
    }

    if (status === 'paid') {
      updateFields.push('settlement_date = ?');
      updateValues.push(new Date().toISOString().split('T')[0]);
    }

    updateValues.push(id);

    await pool.execute(
      `UPDATE claims SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const response: ApiResponse = {
      success: true,
      message: 'Claim status updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Update claim status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to update claim status'
    });
  }
};