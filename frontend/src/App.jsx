import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Comparison from "./pages/Comparison";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
    return (
          <Routes>

          {/* Public Landing Page */}
      
          <Route
              path="/"
              element={<Landing />}
          />
      
          {/* Guest Only */}
      
          <Route
              path="/login"
              element={
                  <GuestRoute>
                      <Login />
                  </GuestRoute>
              }
          />
      
          <Route
              path="/register"
              element={
                  <GuestRoute>
                      <Register />
                  </GuestRoute>
              }
          />
      
          {/* Protected */}
      
          <Route
              path="/dashboard"
              element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
              }
          />
      
          <Route
              path="/comparison"
              element={
                  <ProtectedRoute>
                      <Comparison />
                  </ProtectedRoute>
              }
          />
      
          <Route
              path="/chat"
              element={
                  <ProtectedRoute>
                      <Chat />
                  </ProtectedRoute>
              }
          />
      
      </Routes>
    );
}

export default App;