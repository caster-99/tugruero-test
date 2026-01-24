import type { AxiosError } from "axios";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Solicitud incorrecta. Por favor, verifica los datos enviados.",
  401: "No autorizado.",
  403: "Acceso prohibido. No tienes permisos para realizar esta acción.",
  404: "Endpoint no encontrado.",
  500: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde.",
  502: "Error de pasarela (Bad Gateway). No se pudo obtener una respuesta válida del servidor.",
};

const TRANSLATIONS: Record<string, string> = {
  "Network Error": "Error de red. Revisa tu conexión.",
  "timeout of": "La solicitud tardó demasiado tiempo.",
  "Character not found": "Personaje no encontrado.",
  "Invalid credentials": "Credenciales inválidas.",
  "User already exists": "El usuario ya existe.",
  "Internal Server Error": "Error interno del servidor.",
  Forbidden: "Acceso denegado.",
  Unauthorized: "No autorizado.",
  "Bad Request": "Solicitud incorrecta.",
  "Not Found": "No encontrado.",
};

const translateMessage = (msg: string): string => {
  if (!msg) return msg;

  // Buscar coincidencia exacta
  if (TRANSLATIONS[msg]) return TRANSLATIONS[msg];

  // Buscar coincidencia parcial (para errores que contienen variables)
  const key = Object.keys(TRANSLATIONS).find((k) =>
    msg.toLowerCase().includes(k.toLowerCase()),
  );
  return key ? TRANSLATIONS[key] : msg;
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

      let msg = axiosError.response.data;

      // Si la data es un objeto, intentamos extraer el mensaje
      if (msg && typeof msg === "object") {
        const data = msg as any;
        msg = data.message || data.error || data.errors || data.description;

        if (Array.isArray(msg)) {
          msg = msg
            .map((m: any) =>
              typeof m === "string" ? translateMessage(m) : JSON.stringify(m),
            )
            .join(", ");
        } else if (typeof msg === "string") {
          msg = translateMessage(msg);
        } else if (typeof msg === "object") {
          msg = JSON.stringify(msg);
        }
      } else if (typeof msg === "string") {
        msg = translateMessage(msg);
      }

      const finalMsg = msg || translateMessage(axiosError.response.statusText);
      return `Error ${status}: ${finalMsg}`;
    }

    // Request se hizo pero no hay respuesta
    if (axiosError.request) {
      return "No se pudo conectar con el servidor. Por favor, revisa tu conexión e intenta nuevamente.";
    }
  }

  // Si es un Error normal de JS
  if (error instanceof Error) return translateMessage(error.message);

  // Cualquier otro caso
  return "Ocurrió un error inesperado";
};
