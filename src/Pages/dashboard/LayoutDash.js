import React from "react";
import DashAside from "../../Components/DashAside";
import { Outlet } from "react-router-dom";
import styles from "../../Assets/css/dashboard.module.css";

function LayoutDash() {
  return (
    <div className={styles.containerA}>
      <DashAside />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutDash;
