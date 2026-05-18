// src/routes/AppRoutes.jsx

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";

import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";

import Orders from "../pages/Orders";

import Foods from "../pages/Foods";

import ForgotPassword from "../pages/ForgotPassword";

import ChangePassword from "../pages/ChangePassword";

import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/foods"
          element={
            <ProtectedRoute>

              <Foods />

            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>

              <Orders />

            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>

              <ChangePassword />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}