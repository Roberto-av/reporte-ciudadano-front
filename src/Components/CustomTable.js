// CustomTable.js
import React from 'react';

function CustomTable({ data, columns, actions }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
          {/* Renderizar una columna adicional para las acciones */}
          {actions && actions.length > 0 && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row[column.field]}</td>
            ))}
            {/* Renderizar botones o elementos de acción según las acciones proporcionadas */}
            {actions && actions.length > 0 && (
              <td>
                {actions.map((action, actionIndex) => (
                  <button key={actionIndex} onClick={() => action.onClick(row)}>
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
