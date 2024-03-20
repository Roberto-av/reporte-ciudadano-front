import React, { useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

function UpdateReport({ reportId }) {
    const [status, setStatus] = useState('');
    const [redirect, setRedirect] = useState(false);
    

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.put(`${API_BASE_URL}/report/update/${reportId}`, { status });
            console.log('Estado del reporte actualizado con éxito.');
            setRedirect(true);
        } catch (error) {
            console.error('Error actualizando el estado del reporte:', error);
        }
    };

    if (redirect) {
        return <Navigate to="/reports" />;
    }

    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="status">Actualizar</label>
            {/* Cambiado a un campo de selección para el estado */}
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="PROCESO">PROCESO</option>
              <option value="RESUELTO">RESUELTO</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
          </div>
          <button type="submit">Actualizar</button>
        </form>
      );
    }
    

export default UpdateReport;