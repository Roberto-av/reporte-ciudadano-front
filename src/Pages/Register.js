import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styles from "../Assets/css/register.module.css";
import ErrorMessage from "../Components/ErrorMessage";
import { ReactComponent as Success } from "../Assets/img/success.svg";

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
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Función para limpiar el mensaje de error después de 10 segundos
    const timer = setTimeout(() => {
      setError("");
    }, 7000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    // Función para redireccionar después de 3 segundos si el registro fue exitoso
    let redirectTimer;
    if (success) {
      redirectTimer = setTimeout(() => {
        setRedirect(true);
      }, 2000);
    }
    return () => clearTimeout(redirectTimer);
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = Object.values(formData);
    if (fields.some((field) => field === "")) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Verificar si la contraseña tiene menos de 8 caracteres
    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

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

  return (
    <div className={styles.containerRegister}>
      <div className={styles.formContainer}>
        {success ? (
          <div className={styles.success}>
            <h2>REGISTRO EXITOSO</h2>
            <Success className={styles.successIcon} />
            <p>
              Tu cuenta ha sido creada con éxito. Serás redirigido al inicio de
              sesión en unos segundos...
            </p>
          </div>
        ) : (
          <div>
            <h2>REGISTRO</h2>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <div className={styles.inlineFields}>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Nombre"
                    pattern="[A-Za-z\s]+"
                    title="Ingresa solo letras en este campo"
                  />
                </div>
                <div className={styles.inlineFields}>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Apellidos"
                    pattern="[A-Za-z\s]+"
                    title="Ingresa solo letras en este campo"
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
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?"
                    title="Ingrese un correo electrónico válido"
                  />
                </div>
                <div className={styles.inlineFields}>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Numero de telefono"
                    pattern="[0-9]{10,}"
                    title="Ingresa un numero de telefono valido"
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
                <button type="submit">REGISTRARSE</button>
              </div>
            </form>
            <p>
              ¿Ya tienes una cuenta? <a href="/login">Inicia sesion</a>
            </p>
          </div>
        )}
      </div>
      {redirect && <Navigate to="/login" />}
    </div>
  );
}

export default Register;
