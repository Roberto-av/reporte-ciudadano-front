import React from 'react';
import CustomNavbar from '../Components/CustomNavbar.js';
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <div>
      <CustomNavbar />
      <Outlet/>
    </div>
  );
}

export default Layout;