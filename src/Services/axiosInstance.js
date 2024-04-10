import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_AUTH_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las solicitudes salientes
const addTokenToRequest = (config, token) => {
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

// Función que crea un interceptor con el token proporcionado
export const createInterceptorWithToken = (token) => {
    return AxiosInstance.interceptors.request.use(
        (config) => addTokenToRequest(config, token),
        (error) => Promise.reject(error)
    );
};

// Remover interceptor
export const removeInterceptor = (interceptorId) => {
    AxiosInstance.interceptors.request.eject(interceptorId);
};

export default AxiosInstance;
