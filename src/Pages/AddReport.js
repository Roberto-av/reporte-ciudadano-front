import React, { useState } from "react";
import axios from "axios";

function AddReport() {
  const [formData, setFormData] = useState({
    tiposIncidencia: "",
    description: "",
    address: "",
    comments: "",
    status: "PENDIENTE",
    user: {
        id:2
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/report/save`, formData);
      console.log('Reporte agregado con éxito.');
      // Aquí podrías redirigir a la página de listado de reportes
    } catch (error) {
      console.error('Error al agregar el reporte:', error);
    }
  };

  return (
    <div>
      <h1>Agregar Reporte</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tiposIncidencia">Tipo de incidencia</label>
          <select
            id="tiposIncidencia"
            name="tiposIncidencia"
            value={formData.tiposIncidencia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo de incidencia</option>
            <option value="Bache">Bache</option>
            <option value="Problema_de_alumbrado">Problema de alumbrado</option>
            <option value="Reporte_de_basura">Reporte de basura</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="comments">Comentarios</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Agregar Reporte</button>
      </form>
    </div>
  );
}

export default AddReport;
