import { DashboardComponent } from "./components/dashboard";
import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginViewComponent } from "./components/login-view";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/login" element={<LoginViewComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
