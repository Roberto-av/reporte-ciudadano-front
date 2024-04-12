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
    <div className={styles.containerRegister}>
      <div className={styles.formContainer}>
        <h2>REGISTRO</h2>
        {error && <p class="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inlineFields}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nombre"
            />
            </div>
            <div className={styles.inlineFields}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellidos"
            />
            </div>
          </div>
          <div className={styles.formGroup}>
          <div className={styles.inlineFields}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            </div>
            <div className={styles.inlineFields}>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Numero de telefono"
            />
            </div>
          </div>
          <div className={styles.formGroup}>
          <div className={styles.inlineFields}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
            </div>
            <div className={styles.inlineFields}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
            </div>
          </div>
          <div className={styles.formGroup}>
            <button type="submit">
              REGISTRARSE
            </button>
          </div>
        </form>
        <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesion</a></p>
      </div>
    </div>
  );
}

export default Register;
