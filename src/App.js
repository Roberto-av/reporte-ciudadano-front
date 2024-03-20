// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/style.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import ReportsList from "./Pages/ReportsList";
import User from "./Pages/User";
import UpdateReport from "./Pages/UpdateReport";
import AddReport from "./Pages/AddReport";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/reports/update/:reportId" element={<UpdateReport />} />
          <Route path="/reports/add" element={<AddReport />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;