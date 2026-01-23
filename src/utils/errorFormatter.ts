import type { AxiosError } from "axios";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Solicitud incorrecta. Por favor, verifica los datos enviados.",
  500: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde.",
  502: "Error de pasarela (Bad Gateway). No se pudo obtener una respuesta válida del servidor.",
};

export const formatAxiosError = (error: unknown): string => {
  if (!error) return "Error desconocido";

  // Si es un error de Axios
  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError;

    // Error con respuesta del servidor
    if (axiosError.response) {
      const status = axiosError.response.status;
      
      // Si tenemos un mensaje específico para el status
      if (STATUS_MESSAGES[status]) {
        return STATUS_MESSAGES[status];
      }

      const msg = axiosError.response.data || axiosError.response.statusText;
      return `Error ${status}: ${msg}`;
    }

    // Request se hizo pero no hay respuesta
    if (axiosError.request) {
      return "No se pudo conectar con el servidor. Por favor, revisa tu conexión e intenta nuevamente.";
    }
  }

  // Si es un Error normal de JS
  if (error instanceof Error) return error.message;

  // Cualquier otro caso
  return "Ocurrió un error inesperado";
};

