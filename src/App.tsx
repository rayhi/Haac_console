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

// import PublicRoute from "./hooks/PublicRoute";
// import ProtectedRoute from "./hooks/ProtectedRoute";

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
import  AppTheme  from "../src/shared-theme/AppTheme" // adjust path as needed
import BrokerDetails from "./dashboard/Pages/BrokerDetails";
import ServiceProviderDetails from "./dashboard/Pages/ServiceProviderDetails";
import CustomerDetails from "./dashboard/Pages/CustomerDetails";

// import Demo from "./pages/Demo";

function App() {
  return (
    <>
      <AppTheme>
        <BrowserRouter>
          <Routes>
            {/* public routes */}

            <Route path="/" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />

            {/* Public routes */}

            {/* Public Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/service-provider" element={<ServiceProviders />} />
            <Route path="/service-providers" element={<ServiceProviders />} />
            <Route path="/service-providers/:id" element={<ServiceProviderDetails />} />
            <Route path="/payments/reports" element={<Report />} />
            <Route path="/payments/history" element={<PaymentHistory />} />
            <Route path="/payments/pay" element={<MakePayment />} />
            <Route
              path="/reports/general-reports"
              element={<GeneralReports />}
            />
            <Route
              path="/reports/payment-trends"
              element={<PaymentsTrends />}
            />
            <Route path="/reports/claimsReport" element={<ClaimsReport />} />
            <Route path="/users/brokers" element={<UserBrokers />} />
            <Route
              path="/users/service-providers"
              element={<UsersServiceProviders />}
            />
            <Route path="/users/customers" element={<UsersCustomers />} />
            <Route path="/brokers" element={<Brokers />} />
            <Route path="/brokers/:id" element={<BrokerDetails />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </AppTheme>
    </>
  );
}

export default App;


