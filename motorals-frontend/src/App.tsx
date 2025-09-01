import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bikes from "./pages/Bikes";
import BikeDetails from "./pages/BikesDetails";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import { useAppSelector } from "./app/hooks";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

// Admin route wrapper
function AdminRoute({ children }: { children: JSX.Element }) {
  const role = useAppSelector(s => s.auth.role);
  return role === "ROLE_ADMIN" ? children : <Navigate to="/bikes" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public / user routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Default / redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
