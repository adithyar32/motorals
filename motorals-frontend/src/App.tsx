import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SelectTime from "./pages/SelectTime";
import AvailableBikes from "./pages/AvailableBikes";
import BikeDetails from "./pages/BikesDetails";
import AdminDashboard from "./pages/AdminDashboard";
import { useAppSelector } from "./app/hooks";
import type { JSX } from "react";

// Generic protected route
function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useAppSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

// Admin route wrapper
function AdminRoute({ children }: { children: JSX.Element }) {
  const { token, role } = useAppSelector((s) => s.auth);
  if (!token) return <Navigate to="/login" replace />;
  return role === "ROLE_ADMIN" ? children : <Navigate to="/availability" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected user routes */}
        <Route
          path="/availability"
          element={
            <PrivateRoute>
              <SelectTime />
            </PrivateRoute>
          }
        />
        <Route
          path="/available-bikes"
          element={
            <PrivateRoute>
              <AvailableBikes />
            </PrivateRoute>
          }
        />
        <Route
          path="/bikes/:id"
          element={
            <PrivateRoute>
              <BikeDetails />
            </PrivateRoute>
          }
        />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
