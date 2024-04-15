// UserAside.js
import React from "react";
import { Link } from "react-router-dom";

import styles from "../Assets/css/dashboard.module.css";
import { ReactComponent as UserIcon } from "../Assets/img/user.svg";
import { ReactComponent as EmployeeIcon } from "../Assets/img/employee.svg";
import { ReactComponent as DashIcon } from "../Assets/img/dash.svg";
import { ReactComponent as StadisticIcon } from "../Assets/img/stadistic.svg";
import { ReactComponent as ConfigIcon } from "../Assets/img/config.svg";

function DashAside() {
  return (
    <aside>
      <div className={styles.asidebar}>
        <h1>Admin</h1>
        <Link to="/admin/dashboard">
          <span>
            <DashIcon style={{ marginRight: "5px", marginBottom: "7px" }} />
          </span>
          <h3>DashBoard</h3>
        </Link>
        <Link to="/admin/dashboard/users">
          <span>
            <UserIcon style={{ marginRight: "5px", marginBottom: "7px" }} />
          </span>
          <h3>Usuarios</h3>
        </Link>
        <Link to="/admin/dashboard/employees">
          <span>
            <EmployeeIcon style={{ marginRight: "5px", marginBottom: "7px" }} />
          </span>
          <h3>Empleados</h3>
        </Link>
        <Link to="/admin/dashboard/statistics">
          <span>
            <StadisticIcon
              style={{ marginRight: "5px", marginBottom: "7px" }}
            />
          </span>
          <h3>Estadisticas</h3>
        </Link>
        <Link to="/admin/dashboard/configuration">
          <span>
            <ConfigIcon style={{ marginRight: "5px", marginBottom: "7px" }} />
          </span>
          <h3>Configuración</h3>
        </Link>
      </div>
    </aside>
  );
}

export default DashAside;
