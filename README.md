# Tugruero Test

Este es un proyecto de aplicación web desarrollado con **React**, **TypeScript** y **Vite**. La aplicación incluye gestión de autenticación, manejo de personajes ("Characters") y un sistema de rutas protegidas.

## 🚀 Tecnologías Utilizadas

El proyecto utiliza un conjunto moderno de herramientas y librerías:

- **Core**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Enrutamiento**: [React Router DOM](https://reactrouter.com/)
- **Estilos**: [Sass](https://sass-lang.com/) (SCSS)
- **Formularios y Validación**: [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)
- **Cliente HTTP**: [Axios](https://axios-http.com/)
- **Notificaciones**: [React Hot Toast](https://react-hot-toast.com/)
- **Iconos**: [React Icons](https://react-icons.github.io/react-icons/)
- **Manejo de CSV**: [PapaParse](https://www.papaparse.com/)

## 🛠️ Instalación y Configuración

Sigue estos pasos para configurar el proyecto en tu máquina local:

1.  **Clonar el repositorio** (si aplica) o descargar los archivos.
2.  **Instalar dependencias**:
    Abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible generalmente en `http://localhost:5173`.

## 📦 Construcción para Producción

Para generar los archivos optimizados para producción:

```bash
npm run build
```

Esto creará una carpeta `dist` con los archivos listos para desplegar.

## 📂 Estructura del Proyecto

La estructura principal del código fuente (`src`) está organizada de la siguiente manera:

-   **`components/`**: Componentes reutilizables (ej. Tablas, Botones).
-   **`pages/`**: Vistas principales de la aplicación (ej. Login, Characters).
-   **`api/`**: Lógica de conexión con APIs y servicios externos.
-   **`styles/`**: Estilos globales y variables SCSS.

---

Desarrollado como parte del proyecto **Tugruero Test**.


**.env info:**
VITE_API_URL=https://dragonball-api.com/api
VITE_ADMIN_EMAIL=admin@test.com
VITE_ADMIN_PASSWORD=Admin123
VITE_USER_EMAIL=user@test.com
VITE_USER_PASSWORD=User123
