import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/style.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import ReportsList from './Pages/ReportsList';
import UpdateReport from './Pages/UpdateReport';
import AddReport from './Pages/AddReport';
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomeDash from './Pages/dashboard/HomeDash';
import LayoutDash from './Pages/dashboard/LayoutDash';
import Users from './Pages/dashboard/Users';
import { AuthProvider } from './Services/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/reports" element={<ReportsList />} />
              <Route path="/reports/update/:reportId" element={<UpdateReport />} />
              <Route path="/reports/add" element={<AddReport />} />
              <Route path="/admin/dashboard" element={<LayoutDash />}>
                <Route index element={<HomeDash />} />
                <Route path="users" element={<Users />} />
              </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
