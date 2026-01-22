import { createContext, useContext, useEffect, useState } from "react";
import type { User, Role } from "../types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
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
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
