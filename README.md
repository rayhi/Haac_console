# Insurance Management Platform

A comprehensive insurance management system built with React.js frontend, Node.js backend, and MySQL database. This platform provides complete functionality for managing insurance policies, claims, customers, and payments with role-based access control.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization** - JWT-based auth with role-based access (Admin, Agent, Customer)
- **Policy Management** - Create, view, update, and manage insurance policies
- **Claims Processing** - Submit, track, and process insurance claims
- **Customer Management** - Comprehensive customer profiles and data management
- **Dashboard Analytics** - Real-time statistics and insights
- **Payment Tracking** - Monitor premium payments and financial transactions

### User Roles
- **Admin**: Full system access, user management, comprehensive reporting
- **Agent**: Policy creation, customer management, claims processing
- **Customer**: View personal policies, submit claims, make payments

### Technical Features
- **Responsive Design** - Modern Material-UI interface
- **Real-time Updates** - Live data synchronization
- **Data Security** - Encrypted passwords, secure API endpoints
- **Audit Logging** - Track all system activities
- **Pagination** - Efficient data loading for large datasets

## 🏗️ Architecture

```
insurance-management-platform/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, validation, etc.
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── dashboard/      # Dashboard components
│   │   ├── services/       # API services
│   │   └── shared-theme/   # Material-UI theme
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **jwt-decode** - Token handling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd insurance-management-platform
```

### 2. Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE insurance_management;

# Create a user (optional but recommended)
CREATE USER 'insurance_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON insurance_management.* TO 'insurance_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=insurance_management
# JWT_SECRET=your_jwt_secret_key
# PORT=5000

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000` and automatically:
- Create database tables
- Seed sample data
- Display sample login credentials

### 4. Frontend Setup
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend application
npm run dev
```

The frontend application will start on `http://localhost:3000`

## 🔑 Sample Login Credentials

The system comes with pre-seeded sample data:

### Admin Account
- **Email**: admin@insurance.com
- **Password**: Admin123!

### Agent Account
- **Email**: agent@insurance.com
- **Password**: Agent123!

### Customer Accounts
- **Email**: customer1@example.com
- **Password**: Customer123!
- **Email**: customer2@example.com
- **Password**: Customer123!
- **Email**: customer3@example.com
- **Password**: Customer123!

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/register
GET /api/auth/profile
PUT /api/auth/profile
PUT /api/auth/change-password
```

### Policy Endpoints
```
GET /api/policies
GET /api/policies/:id
POST /api/policies
PUT /api/policies/:id
```

### Claims Endpoints
```
GET /api/claims
POST /api/claims
PUT /api/claims/:id/status
```

### Dashboard Endpoints
```
GET /api/dashboard/stats
GET /api/dashboard/monthly-stats
```

### Example API Request
```javascript
// Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@insurance.com",
  "password": "Admin123!"
}

// Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "admin@insurance.com",
      "first_name": "Admin",
      "last_name": "User",
      "role": "admin"
    }
  }
}
```

## 🎯 Usage Guide

### For Administrators
1. **Login** with admin credentials
2. **Dashboard Overview** - View system-wide statistics
3. **User Management** - Create and manage agents and customers
4. **Policy Oversight** - Monitor all policies across the system
5. **Claims Management** - Review and approve/reject claims
6. **Reports** - Generate comprehensive system reports

### For Agents
1. **Customer Management** - Add and manage customer profiles
2. **Policy Creation** - Create new insurance policies
3. **Claims Processing** - Review and process customer claims
4. **Payment Tracking** - Monitor premium payments

### For Customers
1. **Policy Viewing** - View personal insurance policies
2. **Claims Submission** - Submit new insurance claims
3. **Payment History** - Track premium payments
4. **Profile Management** - Update personal information

## 🔧 Development

### Backend Development
```bash
cd backend

# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend Development
```bash
cd frontend

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Schema

The system includes the following main tables:
- **users** - User authentication and basic info
- **customers** - Extended customer information
- **insurance_products** - Available insurance products
- **policies** - Insurance policy records
- **claims** - Insurance claim records
- **payments** - Payment transaction records
- **audit_logs** - System activity logging

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Role-Based Access Control** - Granular permission system
- **Input Validation** - Server-side validation for all inputs
- **SQL Injection Prevention** - Parameterized queries
- **Rate Limiting** - API request throttling
- **CORS Protection** - Cross-origin request security

## 🚀 Deployment

### Environment Variables

#### Backend (.env)
```
DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=insurance_management
PORT=5000
NODE_ENV=production
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRE=24h
FRONTEND_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```
VITE_API_URL=https://your-backend-domain.com/api
```

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
# Serve the dist/ folder with your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the sample data and API responses

## 🔄 Updates & Maintenance

- Regular security updates
- Database backup recommendations
- Performance monitoring suggestions
- Scaling considerations for production use

---

**Built with ❤️ for efficient insurance management**
