import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styles from "../Assets/css/register.module.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_AUTH_URL}/auth/register`,
        formData
      );
      console.log("Registration successful:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Error en el registro. Por favor, inténtalo de nuevo.");
    }
  };

  if (success) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>REGISTRO</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Número de teléfono:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            REGISTRARSE
          </button>
        </form>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesion</a></p>
      </div>
    </div>
  );
}

export default Register;
