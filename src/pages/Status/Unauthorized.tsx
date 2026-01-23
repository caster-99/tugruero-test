import { useNavigate } from "react-router-dom";
import "./StatusPages.scss";


const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="status-page">
      <h1>Acceso Restringido</h1>
      <p>No tienes permisos suficientes para acceder a esta sección.</p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

export default Unauthorized;
