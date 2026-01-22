import { createContext, useContext, useEffect, useState } from "react";
import type { User, Role } from "../types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const userEmail = import.meta.env.VITE_USER_EMAIL;
    const userPassword = import.meta.env.VITE_USER_PASSWORD;

    let loggedUser: User | null = null;

    if (email === adminEmail && password === adminPassword) {
      loggedUser = { email, role: "admin" };
    }

    if (email === userEmail && password === userPassword) {
      loggedUser = { email, role: "user" };
    }

    if (!loggedUser) return false;

    sessionStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
