// CustomTable.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Assets/css/dashboard.module.css";
import { ReactComponent as DeleteICon } from "../Assets/img/delete.svg";

function CustomTable({ data, columns, onDelete  }) {
    const [deletedRows, setDeletedRows] = useState([]);

    const handleDeleteClick = (rowIndex) => {
        const itemId = data[rowIndex].id;
        onDelete(itemId);
        setDeletedRows([...deletedRows, rowIndex]);
    };
    

  return (
    <div className={styles.cotainertableUsers}>
      <table className={styles.tableUsers}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
              <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tableRow}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`${styles.tableRow} ${
                    deletedRows.includes(rowIndex) ? styles.deleted : ""
                  }`}
                >
                 {column.field === "id" ? (
                    <Link to={`/reports/${row[column.field]}`}>
                      {row[column.field]}
                    </Link>
                  ) : (
                    row[column.field]
                  )}
                </td>
              ))}
              <td>
                <button className={styles.buttonDelete} onClick={() => handleDeleteClick(rowIndex)}><DeleteICon/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
