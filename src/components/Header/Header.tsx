import { IoMenu } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import "./Header.scss";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <button className="menu-btn" onClick={onMenuClick}>
          <IoMenu />
        </button>
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
export { Header };
