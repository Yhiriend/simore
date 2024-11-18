import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // URL base para todas las solicitudes
  timeout: 5000, // Tiempo máximo de espera (en milisegundos)
  headers: {
    "Content-Type": "application/json", // Tipo de contenido por defecto
  },
});

// Interceptores de solicitud (opcional)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Solicitud enviada:", config);
    return config;
  },
  (error) => {
    console.error("Error en la solicitud:", error);
    return Promise.reject(error);
  }
);

// Interceptores de respuesta (opcional)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Respuesta recibida:", response);
    return response;
  },
  (error) => {
    console.error("Error en la respuesta:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
