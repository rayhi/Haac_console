#!/bin/bash

# Insurance Management Platform Setup Script
echo "🏥 Setting up Insurance Management Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_nodejs() {
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js v18 or higher."
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Check if MySQL is installed
check_mysql() {
    if command -v mysql >/dev/null 2>&1; then
        print_success "MySQL is installed"
    else
        print_warning "MySQL not found. Please ensure MySQL is installed and running."
    fi
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend || exit 1
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    # Copy environment file
    if [ ! -f .env ]; then
        print_status "Creating environment file..."
        cp .env.example .env
        print_warning "Please edit backend/.env file with your database credentials"
    else
        print_status "Environment file already exists"
    fi
    
    cd ..
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend || exit 1
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    # Check if .env exists
    if [ ! -f .env ]; then
        print_status "Frontend environment file already configured"
    fi
    
    cd ..
}

# Create database
create_database() {
    print_status "Database setup instructions:"
    echo "1. Login to MySQL: mysql -u root -p"
    echo "2. Create database: CREATE DATABASE insurance_management;"
    echo "3. Create user (optional): CREATE USER 'insurance_user'@'localhost' IDENTIFIED BY 'your_password';"
    echo "4. Grant privileges: GRANT ALL PRIVILEGES ON insurance_management.* TO 'insurance_user'@'localhost';"
    echo "5. Flush privileges: FLUSH PRIVILEGES;"
    echo ""
}

# Main setup function
main() {
    echo "🚀 Starting Insurance Management Platform Setup"
    echo "=============================================="
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_nodejs
    check_npm
    check_mysql
    
    echo ""
    
    # Setup backend
    setup_backend
    
    echo ""
    
    # Setup frontend
    setup_frontend
    
    echo ""
    
    # Database instructions
    create_database
    
    # Final instructions
    echo "✅ Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure your database connection in backend/.env"
    echo "2. Start the backend server:"
    echo "   cd backend && npm run dev"
    echo "3. In a new terminal, start the frontend:"
    echo "   cd frontend && npm run dev"
    echo ""
    echo "🌐 Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5000"
    echo ""
    echo "🔑 Sample login credentials:"
    echo "   Admin: admin@insurance.com / Admin123!"
    echo "   Agent: agent@insurance.com / Agent123!"
    echo "   Customer: customer1@example.com / Customer123!"
    echo ""
    print_success "Happy coding! 🎉"
}

# Run main function
main