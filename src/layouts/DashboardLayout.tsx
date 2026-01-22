import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./DashboardLayout.scss";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="dashboard">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="dashboard__body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="dashboard__content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
