import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Request llegó al servidor pero falló
    if (error.response) {
      const message =
        error.response.data?.message || `Error ${error.response.status}`;

      return Promise.reject(new Error(message));
    }

    // Request se hizo pero no hubo respuesta
    if (error.request) {
      return Promise.reject(new Error("No se pudo conectar con el servidor"));
    }

    // Error al configurar la request
    return Promise.reject(new Error("Error inesperado"));
  },
);
