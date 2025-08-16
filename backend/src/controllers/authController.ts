import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { pool } from '../config/database.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';
import { User, AuthRequest, ApiResponse, AuthResponse } from '../types/index.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const register = async (req: Request, res: Response): Promise<void> => {
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

    const { email, password, first_name, last_name, role = 'customer', phone, address } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (email, password, first_name, last_name, role, phone, address) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, first_name, last_name, role, phone, address]
    );

    const userId = result.insertId;

    // If role is customer, create customer record
    if (role === 'customer') {
      await pool.execute(
        'INSERT INTO customers (user_id) VALUES (?)',
        [userId]
      );
    }

    // Get created user (without password)
    const [newUser] = await pool.execute<RowDataPacket[]>(
      'SELECT id, email, first_name, last_name, role, phone, address, created_at FROM users WHERE id = ?',
      [userId]
    );

    const user = newUser[0] as User;
    const token = generateToken(user);

    const response: ApiResponse<AuthResponse> = {
      success: true,
      message: 'User registered successfully',
      data: { token, user }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to register user'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
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

    const { email, password }: AuthRequest = req.body;

    // Get user with password
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ? AND is_active = true',
      [email]
    );

    if (users.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    const user = users[0] as User;

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password!);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
      return;
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    const response: ApiResponse<AuthResponse> = {
      success: true,
      message: 'Login successful',
      data: { token, user: userWithoutPassword }
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to login'
    });
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const [users] = await pool.execute<RowDataPacket[]>(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.phone, u.address, u.created_at,
              c.date_of_birth, c.gender, c.occupation, c.annual_income, c.marital_status,
              c.emergency_contact_name, c.emergency_contact_phone
       FROM users u
       LEFT JOIN customers c ON u.id = c.user_id
       WHERE u.id = ? AND u.is_active = true`,
      [userId]
    );

    if (users.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    const response: ApiResponse<User> = {
      success: true,
      message: 'Profile retrieved successfully',
      data: users[0] as User
    };

    res.json(response);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to get profile'
    });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

    const userId = req.user?.id;
    const { first_name, last_name, phone, address, date_of_birth, gender, occupation, annual_income, marital_status, emergency_contact_name, emergency_contact_phone } = req.body;

    // Update user table
    await pool.execute(
      'UPDATE users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?',
      [first_name, last_name, phone, address, userId]
    );

    // Update customer table if user is a customer
    if (req.user?.role === 'customer') {
      await pool.execute(
        `UPDATE customers SET 
         date_of_birth = ?, gender = ?, occupation = ?, annual_income = ?, 
         marital_status = ?, emergency_contact_name = ?, emergency_contact_phone = ?
         WHERE user_id = ?`,
        [date_of_birth, gender, occupation, annual_income, marital_status, emergency_contact_name, emergency_contact_phone, userId]
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Profile updated successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to update profile'
    });
  }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    // Get current password
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT password FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    const user = users[0] as User;

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password!);
    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedNewPassword, userId]
    );

    const response: ApiResponse = {
      success: true,
      message: 'Password changed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'Failed to change password'
    });
  }
};