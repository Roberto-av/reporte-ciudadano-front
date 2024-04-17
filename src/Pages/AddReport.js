import React, { useState, useEffect } from "react";
import { useAuth } from "../Services/AuthContext";
import axios from "../Services/axiosInstance";
import styles from "../Assets/css/addReport.module.css";
import ErrorMessage from "../Components/ErrorMessage";
import SuccessMessage from "../Components/SuccessMessage";

function AddReport() {
  const { user, token } = useAuth();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para limpiar el mensaje de error después de 10 segundos
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 6000);
    return () => clearTimeout(timer);
  }, [error, success  ]);

  const [formData, setFormData] = useState({
    tiposIncidencia: "",
    description: "",
    address: "",
    comments: "",
    status: "PENDIENTE",
    user: {
      id: user.id, // Usa el ID del usuario actual
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/report/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
          },
        }
      );
      setSuccess("¡Reporte agregado con éxito!");
      console.log("Reporte agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar el reporte:", error);
      setError("Ha ocurrido un problema al intentar hacer el reporte");
    }
  };

  return (
    <div className={styles.containerReportC}>
      <div className={styles.containerFrameC}>
        <h1>Hacer Reporte</h1>
        {success && <SuccessMessage message={success} />}
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroupC}>
            <label htmlFor="tiposIncidencia">Tipo de incidencia</label>
            <select
              id="tiposIncidencia"
              name="tiposIncidencia"
              value={formData.tiposIncidencia}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una opcion</option>
              <option value="BACHE">bache</option>
              <option value="PROBLEMA_ALUMBRADO">Problema de alumbrado</option>
              <option value="REPORTE_BASURA">Reporte de basura</option>
            </select>
          </div>
          <div className={styles.formGroupC}>
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ resize: "none" }}
              required
            />
          </div>
          <div className={styles.formGroupC}>
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
          <div className={styles.formGroupC}>
            <label htmlFor="comments">Comentarios</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              style={{ resize: "none" }}
            />
          </div>
          <button className={styles.buttonSub} type="submit">
            Agregar Reporte
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReport;
