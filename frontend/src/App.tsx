import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Pages/Dashboard";
import Profile from "./dashboard/Pages/Profile";
import Settings from "./dashboard/Pages/Settings";
import ClaimsReport from "./dashboard/Pages/Reports/ClaimsReport";
import PaymentsTrends from "./dashboard/Pages/Reports/PaymentsTrends";
import MakePayment from "./dashboard/Pages/Payments/MakePayment";
import PaymentHistory from "./dashboard/Pages/Payments/PaymentHistory";
import Report from "./dashboard/Pages/Payments/Report";
import Policies from "./dashboard/Pages/Policies";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import ForgotPassword from "./dashboard/Pages/Auth/ForgotPassword";
import ResetPassword from "./dashboard/Pages/Auth/ResetPassword";
import Notifications from "./dashboard/Pages/Notifications";
import Agents from "./dashboard/Pages/Agents";
import Customers from "./dashboard/Pages/Customers";
import GeneralReports from "./dashboard/Pages/Reports/GeneralReports";
import Claims from "./dashboard/Pages/Claims";
import Insurance from "./dashboard/Pages/Insurance";
import ServiceProviders from "./dashboard/Pages/ServiceProviders";
import UserBrokers from "./dashboard/Pages/Users/Brokers";
import Brokers from "./dashboard/Pages/Brokers";
import UsersServiceProviders from "./dashboard/Pages/Users/ServiceProviders";
import UsersCustomers from "./dashboard/Pages/Users/Customers";
import Login from "./dashboard/Pages/Auth/Login";
import Signup from "./dashboard/Pages/Auth/Signup";
import AppTheme from "../src/shared-theme/AppTheme" // adjust path as needed
import BrokerDetails from "./dashboard/Pages/BrokerDetails";
import ServiceProviderDetails from "./dashboard/Pages/ServiceProviderDetails";
import CustomerDetails from "./dashboard/Pages/CustomerDetails";
import { AuthProvider } from "./contexts/AuthContext";

// import Demo from "./pages/Demo";

function App() {
  return (
    <>
      <AppTheme>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/forgotpassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
              <Route path="/agents" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><Agents /></ProtectedRoute>} />
              <Route path="/customers" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><Customers /></ProtectedRoute>} />
              <Route path="/customers/:id" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><CustomerDetails /></ProtectedRoute>} />
              <Route path="/claims" element={<ProtectedRoute><Claims /></ProtectedRoute>} />
              <Route path="/insurance" element={<ProtectedRoute><Insurance /></ProtectedRoute>} />
              <Route path="/service-provider" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><ServiceProviders /></ProtectedRoute>} />
              <Route path="/service-providers" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><ServiceProviders /></ProtectedRoute>} />
              <Route path="/service-providers/:id" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><ServiceProviderDetails /></ProtectedRoute>} />
              <Route path="/payments/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
              <Route path="/payments/history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
              <Route path="/payments/pay" element={<ProtectedRoute><MakePayment /></ProtectedRoute>} />
              <Route path="/reports/general-reports" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><GeneralReports /></ProtectedRoute>} />
              <Route path="/reports/payment-trends" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><PaymentsTrends /></ProtectedRoute>} />
              <Route path="/reports/claimsReport" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><ClaimsReport /></ProtectedRoute>} />
              <Route path="/users/brokers" element={<ProtectedRoute requiredRoles={['admin']}><UserBrokers /></ProtectedRoute>} />
              <Route path="/users/service-providers" element={<ProtectedRoute requiredRoles={['admin']}><UsersServiceProviders /></ProtectedRoute>} />
              <Route path="/users/customers" element={<ProtectedRoute requiredRoles={['admin']}><UsersCustomers /></ProtectedRoute>} />
              <Route path="/brokers" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><Brokers /></ProtectedRoute>} />
              <Route path="/brokers/:id" element={<ProtectedRoute requiredRoles={['admin', 'agent']}><BrokerDetails /></ProtectedRoute>} />

              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AppTheme>
    </>
  );
}

export default App;


