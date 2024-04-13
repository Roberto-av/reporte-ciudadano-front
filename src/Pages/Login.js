import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Services/AuthContext";
import { Navigate } from "react-router-dom";
import styles from "../Assets/css/login.module.css";
import AxiosInstance from "../Services/axiosInstance";
import ErrorMessage from "../Components/ErrorMessage";

function Login() {
  const { updateToken, updateUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para limpiar el mensaje de error después de 10 segundos
    const timer = setTimeout(() => {
      setError("");
    }, 7000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_AUTH_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      const { token, message, user_id } = response.data;

      if (message === "Invalid username or password") {
        console.log("Usuario no encontrado:", message);
        setError(
          "Usuario o Contraseña incorrectos, porfavor intentelo de nuevo."
        );
        return;
      }
      localStorage.setItem("token", token);
      console.log("El error del server", message);
      console.log("Message:", message);
      updateToken(token);

      // Obtener los roles del usuario desde el endpoint correspondiente
      const rolesResponse = await AxiosInstance.get(
        `/auth/userRoles/${user_id}`
      );
      const roles = rolesResponse.data;
      updateUser({ id: user_id, roles: roles });
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.message);
      setError(
        "Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2>Iniciar Sesión</h2>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button className="loginButton" type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
