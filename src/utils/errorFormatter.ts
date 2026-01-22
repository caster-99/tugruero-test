import type { AxiosError } from "axios";

export const formatAxiosError = (error: unknown): string => {
  if (!error) return "Error desconocido";

  // Si es un error de Axios
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;

    // Error con respuesta del servidor
    if (axiosError.response) {
      const status = axiosError.response.status;
      const msg = axiosError.response.data || axiosError.response.statusText;

      return `Error ${status}: ${msg}`;
    }

    // Request se hizo pero no hay respuesta
    if (axiosError.request) {
      return "No se pudo conectar con el servidor. Intenta nuevamente.";
    }
  }

  // Si es un Error normal de JS
  if (error instanceof Error) return error.message;

  // Cualquier otro caso
  return "Ocurrió un error inesperado";
};
