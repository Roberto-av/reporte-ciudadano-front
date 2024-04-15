import React from "react";
import DashAside from "../../Components/DashAside";
import { Outlet } from "react-router-dom";

function LayoutDash() {
  return (
    <div>
      <Outlet />
      <DashAside />
    </div>
  );
}

export default LayoutDash;
