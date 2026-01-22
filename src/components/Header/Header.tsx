import { useAuth } from "../../auth/AuthContext";
import "./Header.scss";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <span className="logo">DragonBall Admin</span>
      </div>

      <div className="header__right">
        <span className="user">{user?.email}</span>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </div>
    </header>
  );
};
