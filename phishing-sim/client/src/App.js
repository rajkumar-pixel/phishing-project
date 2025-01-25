import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Email";
import Navbar from './components/Navbar' 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailPage from "./pages/EmailPage";
import ProtectedRoute from './ProtectedRoute'
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path="/emails" element={<ProtectedRoute><Emails /> </ProtectedRoute>} />
        <Route path="/emailpage" element={<ProtectedRoute><EmailPage /> </ProtectedRoute>} />
        <Route path="/login" element={ <Login /> }  />
        <Route path="/signup" element={ <Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
