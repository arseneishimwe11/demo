import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import ParkingLocations from "./pages/dashboard/ParkingLocationsPage";
import VehicleEntries from "./pages/dashboard/VehiclesPage";
// import Reports from "./pages/dashboard/Reports";
// import UserManagement from "./pages/dashboard/UserManagement";
// import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./pages/routing/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/parking"
          element={
            <PrivateRoute>
              <ParkingLocations />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/vehicles"
          element={
            <PrivateRoute>
              <VehicleEntries />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/dashboard/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/dashboard/users"
          element={
            <PrivateRoute roles={["admin"]}>
              <UserManagement />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        /> */}

        {/* Demo Routes */}
        <Route
          path="/demo/parking"
          element={<ParkingLocations demo={true} />}
        />
        <Route path="/demo/vehicles" element={<VehicleEntries demo={true} />} />
        {/* <Route path="/demo/reports" element={<Reports demo={true} />} /> */}

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
