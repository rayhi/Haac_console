import { body } from 'express-validator';

export const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('first_name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('last_name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'agent', 'customer'])
    .withMessage('Role must be admin, agent, or customer'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const validateProfileUpdate = [
  body('first_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('last_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  body('annual_income')
    .optional()
    .isNumeric()
    .withMessage('Annual income must be a number'),
  body('marital_status')
    .optional()
    .isIn(['single', 'married', 'divorced', 'widowed'])
    .withMessage('Marital status must be single, married, divorced, or widowed'),
];

export const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
];

export const validatePolicy = [
  body('customer_id')
    .isInt({ min: 1 })
    .withMessage('Customer ID must be a positive integer'),
  body('product_id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
  body('premium_amount')
    .isFloat({ min: 0 })
    .withMessage('Premium amount must be a positive number'),
  body('coverage_amount')
    .isFloat({ min: 0 })
    .withMessage('Coverage amount must be a positive number'),
  body('start_date')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  body('end_date')
    .isISO8601()
    .withMessage('Please provide a valid end date'),
  body('payment_frequency')
    .optional()
    .isIn(['monthly', 'quarterly', 'semi-annual', 'annual'])
    .withMessage('Payment frequency must be monthly, quarterly, semi-annual, or annual'),
  body('beneficiary_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Beneficiary name must be between 2 and 100 characters'),
];

export const validateClaim = [
  body('policy_id')
    .isInt({ min: 1 })
    .withMessage('Policy ID must be a positive integer'),
  body('claim_amount')
    .isFloat({ min: 0 })
    .withMessage('Claim amount must be a positive number'),
  body('incident_date')
    .isISO8601()
    .withMessage('Please provide a valid incident date'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
];

export const validatePayment = [
  body('policy_id')
    .isInt({ min: 1 })
    .withMessage('Policy ID must be a positive integer'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('payment_date')
    .isISO8601()
    .withMessage('Please provide a valid payment date'),
  body('due_date')
    .isISO8601()
    .withMessage('Please provide a valid due date'),
  body('payment_method')
    .optional()
    .isIn(['credit_card', 'bank_transfer', 'check', 'cash'])
    .withMessage('Payment method must be credit_card, bank_transfer, check, or cash'),
];

export const validateInsuranceProduct = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  body('type')
    .isIn(['life', 'health', 'auto', 'home', 'travel'])
    .withMessage('Product type must be life, health, auto, home, or travel'),
  body('base_premium')
    .isFloat({ min: 0 })
    .withMessage('Base premium must be a positive number'),
  body('coverage_amount')
    .isFloat({ min: 0 })
    .withMessage('Coverage amount must be a positive number'),
  body('term_years')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Term years must be between 1 and 100'),
];