import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import Homepage from "./components/Homepage";
import UserDashboard from "./components/UserDashboard";
import WorkerDashboard from "./components/WorkerDashboard";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#193661] to-[#000503] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
  <Router>
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Auth />} />
        </>
      )}

      {user && (
        <>
        <Route
          path="/dashboard"
          element={
            <Layout>
              {user.role === 'user' ? <UserDashboard /> : <WorkerDashboard />}
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
}

export default App;
