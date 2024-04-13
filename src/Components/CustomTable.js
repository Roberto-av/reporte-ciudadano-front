// CustomTable.js
import React from "react";
import { useAuth } from "../Services/AuthContext";

function CustomTable({ data, columns, actions, onSortByStatus  }) {
  const { user } = useAuth();
  const isAdminOrEmployee =
    user &&
    user.roles &&
    (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_EMPLOYEE"));

    const handleSortByStatus = () => {
      if (onSortByStatus) {
        onSortByStatus();
      }
    };

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>
            {column.header}
            {column.field === "status" && (
              <span style={{cursor: "pointer"}} onClick={handleSortByStatus}> ▼</span>
            )}
          </th>
          ))}
          {isAdminOrEmployee && actions && actions.length > 0 && (
            <th>Acciones</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                style={column.style ? column.style(row[column.field]) : {}}
              >
                {row[column.field]}
              </td>
            ))}
            {/* Renderizar botones o elementos de acción solo si el usuario es admin o employee */}
            {isAdminOrEmployee && actions && actions.length > 0 && (
              <td>
              {actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  onClick={() => action.onClick(row)}
                  disabled={action.isDisabled && action.isDisabled(row)} // Modificado
                  >
                  {action.label}
                </button>
              ))}
            </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
