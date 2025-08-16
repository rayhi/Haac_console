import { Response } from 'express';
import { pool } from '../config/database.js';
import { DashboardStats, ApiResponse } from '../types/index.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { RowDataPacket } from 'mysql2';

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    let stats: DashboardStats;

    if (userRole === 'customer') {
      // Customer dashboard - show only their data
      const [customerStats] = await pool.execute<RowDataPacket[]>(
        `SELECT 
          (SELECT COUNT(*) FROM policies p JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ?) as totalPolicies,
          (SELECT COUNT(*) FROM policies p JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ? AND p.status = 'active') as activePolicies,
          (SELECT COUNT(*) FROM claims cl JOIN policies p ON cl.policy_id = p.id JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ?) as totalClaims,
          (SELECT COUNT(*) FROM claims cl JOIN policies p ON cl.policy_id = p.id JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ? AND cl.status = 'pending') as pendingClaims,
          (SELECT COALESCE(SUM(premium_amount), 0) FROM policies p JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ? AND p.status = 'active') as totalPremiumAmount`,
        [userId, userId, userId, userId, userId]
      );

      const [recentPolicies] = await pool.execute<RowDataPacket[]>(
        `SELECT p.*, ip.name as product_name, ip.type as product_type
         FROM policies p
         JOIN customers c ON p.customer_id = c.id
         JOIN insurance_products ip ON p.product_id = ip.id
         WHERE c.user_id = ?
         ORDER BY p.created_at DESC
         LIMIT 5`,
        [userId]
      );

      const [recentClaims] = await pool.execute<RowDataPacket[]>(
        `SELECT cl.*, p.policy_number
         FROM claims cl
         JOIN policies p ON cl.policy_id = p.id
         JOIN customers c ON p.customer_id = c.id
         WHERE c.user_id = ?
         ORDER BY cl.created_at DESC
         LIMIT 5`,
        [userId]
      );

      stats = {
        totalPolicies: customerStats[0].totalPolicies,
        activePolicies: customerStats[0].activePolicies,
        totalClaims: customerStats[0].totalClaims,
        pendingClaims: customerStats[0].pendingClaims,
        totalCustomers: 1, // Customer only sees themselves
        totalPremiumCollected: customerStats[0].totalPremiumAmount,
        recentPolicies: recentPolicies as any[],
        recentClaims: recentClaims as any[]
      };
    } else {
      // Admin/Agent dashboard - show all data
      const [adminStats] = await pool.execute<RowDataPacket[]>(
        `SELECT 
          (SELECT COUNT(*) FROM policies) as totalPolicies,
          (SELECT COUNT(*) FROM policies WHERE status = 'active') as activePolicies,
          (SELECT COUNT(*) FROM claims) as totalClaims,
          (SELECT COUNT(*) FROM claims WHERE status = 'pending') as pendingClaims,
          (SELECT COUNT(*) FROM customers) as totalCustomers,
          (SELECT COALESCE(SUM(premium_amount), 0) FROM policies WHERE status = 'active') as totalPremiumCollected`
      );

      const [recentPolicies] = await pool.execute<RowDataPacket[]>(
        `SELECT p.*, 
                CONCAT(u.first_name, ' ', u.last_name) as customer_name,
                ip.name as product_name, ip.type as product_type
         FROM policies p
         JOIN customers c ON p.customer_id = c.id
         JOIN users u ON c.user_id = u.id
         JOIN insurance_products ip ON p.product_id = ip.id
         ORDER BY p.created_at DESC
         LIMIT 5`
      );

      const [recentClaims] = await pool.execute<RowDataPacket[]>(
        `SELECT cl.*, p.policy_number,
                CONCAT(u.first_name, ' ', u.last_name) as customer_name
         FROM claims cl
         JOIN policies p ON cl.policy_id = p.id
         JOIN customers c ON p.customer_id = c.id
         JOIN users u ON c.user_id = u.id
         ORDER BY cl.created_at DESC
         LIMIT 5`
      );

      stats = {
        totalPolicies: adminStats[0].totalPolicies,
        activePolicies: adminStats[0].activePolicies,
        totalClaims: adminStats[0].totalClaims,
        pendingClaims: adminStats[0].pendingClaims,
        totalCustomers: adminStats[0].totalCustomers,
        totalPremiumCollected: adminStats[0].totalPremiumCollected,
        recentPolicies: recentPolicies as any[],
        recentClaims: recentClaims as any[]
      };
    }

    const response: ApiResponse<DashboardStats> = {
      success: true,
      message: 'Dashboard stats retrieved successfully',
      data: stats
    };

    res.json(response);
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve dashboard stats'
    });
  }
};

export const getMonthlyStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;

    let whereClause = '';
    const queryParams: any[] = [];

    if (userRole === 'customer') {
      whereClause = 'JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ?';
      queryParams.push(userId);
    } else {
      whereClause = 'WHERE 1=1';
    }

    // Get monthly policy creation stats for the last 12 months
    const [monthlyPolicies] = await pool.execute<RowDataPacket[]>(
      `SELECT 
        DATE_FORMAT(p.created_at, '%Y-%m') as month,
        COUNT(*) as count,
        SUM(p.premium_amount) as total_premium
       FROM policies p
       ${whereClause}
       AND p.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(p.created_at, '%Y-%m')
       ORDER BY month`,
      queryParams
    );

    // Get monthly claims stats
    const claimsWhereClause = userRole === 'customer' 
      ? 'JOIN policies p ON cl.policy_id = p.id JOIN customers c ON p.customer_id = c.id WHERE c.user_id = ?'
      : 'WHERE 1=1';

    const claimsParams = userRole === 'customer' ? [userId] : [];

    const [monthlyClaims] = await pool.execute<RowDataPacket[]>(
      `SELECT 
        DATE_FORMAT(cl.created_at, '%Y-%m') as month,
        COUNT(*) as count,
        SUM(cl.claim_amount) as total_amount
       FROM claims cl
       ${claimsWhereClause}
       AND cl.created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(cl.created_at, '%Y-%m')
       ORDER BY month`,
      claimsParams
    );

    const response: ApiResponse<{
      monthlyPolicies: any[];
      monthlyClaims: any[];
    }> = {
      success: true,
      message: 'Monthly stats retrieved successfully',
      data: {
        monthlyPolicies: monthlyPolicies,
        monthlyClaims: monthlyClaims
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Get monthly stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to retrieve monthly stats'
    });
  }
};