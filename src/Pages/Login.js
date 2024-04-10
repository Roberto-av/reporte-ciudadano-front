import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Services/AuthContext'; 
import { Navigate } from 'react-router-dom'; 
import styles from '../Assets/login.module.css'; 
import AxiosInstance from "../Services/axiosInstance";

function Login() {
    const { updateToken, updateUser  } = useAuth(); // Obtiene la función updateToken del contexto de autenticación

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_AUTH_URL}/auth/login`, {
                username,
                password,
            });
            const { token, message, user_id } = response.data; // Obtener el id del usuario

            if (message === "Invalid username or password") {
                // Si el mensaje indica que el usuario no fue encontrado
                console.log('Usuario no encontrado:', message);
                setError("Usuario o Contraseña incorrectos, porfavor intentelo de nuevo.");
                return;
            }
            localStorage.setItem('token', token);
            console.log('El error del server', message);
            console.log("Message:", message);
            updateToken(token);
    
            // Obtener los roles del usuario desde el endpoint correspondiente
            const rolesResponse = await AxiosInstance.get(`/auth/userRoles/${user_id}`);
            const roles = rolesResponse.data;
            updateUser({ id: user_id, roles: roles });
        } catch (error) {
            // Manejo de errores de red u otros errores
            console.error('Error durante el inicio de sesión:', error.message);
            setError('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
        }
    };

 
    if (localStorage.getItem('token')) {
        return <Navigate to="/" />;
    }

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
                    <button className='loginButton' type="submit">Iniciar Sesión</button>
                </form>
                <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
            </div>
        </div>
    );
}

export default Login;
