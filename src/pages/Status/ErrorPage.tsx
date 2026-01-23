import { useNavigate } from "react-router-dom";
import "./StatusPages.scss";


const ErrorPage = ({ message }: { message?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="status-page">
      <h1>¡Ups!</h1>
      <h2>Algo salió mal</h2>
      <p>{message || "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."}</p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

export default ErrorPage;
