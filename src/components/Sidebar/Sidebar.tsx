import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Sidebar.scss";

export const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/">Personajes</NavLink>
        <NavLink to="/planets">Planetas</NavLink>

        {user?.role === "admin" && (
          <NavLink to="/characters/new">Nuevo Personaje</NavLink>
        )}
      </nav>
    </aside>
  );
};
