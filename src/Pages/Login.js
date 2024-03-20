import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Assets/login.module.css'; // Importa los estilos de CSS Modules

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
          username,
          password,
        });
        // Manejar la respuesta (por ejemplo, guardar el token de acceso)
      } catch (error) {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    };

    return (
        <div className={styles.container}>
          <div className={styles.loginContainer}>
            <h2>Iniciar Sesión</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Usuario</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
          </div>
        </div>
      );
    }
    
export default Login;
