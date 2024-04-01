import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/style.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import ReportsList from "./Pages/ReportsList";
import UpdateReport from "./Pages/UpdateReport";
import AddReport from "./Pages/AddReport";
import Login from "./Pages/Login";
import { AuthProvider } from "./Services/AuthContext"; // Importa el proveedor de contexto de autenticación

function App() {
  return (
    <AuthProvider> {/* Envuelve la aplicación con el proveedor de contexto de autenticación */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/reports" element={<ReportsList />} />
            <Route path="/reports/update/:reportId" element={<UpdateReport />} />
            <Route path="/reports/add" element={<AddReport />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
