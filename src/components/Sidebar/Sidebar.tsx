import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.scss";
import { IoMdClose } from "react-icons/io";

export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user } = useAuth();

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close" onClick={() => onClose()}>
          <IoMdClose />
        </button>

        <nav>
          <NavLink to="/">Personajes</NavLink>
          <NavLink to="/planets">Planetas</NavLink>

          {user?.role === "admin" && (
            <NavLink to="/characters/new">Nuevo Personaje</NavLink>
          )}
        </nav>
      </aside>
    </>
  );
};
