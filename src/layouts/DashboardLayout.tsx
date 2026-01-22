import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./DashboardLayout.scss";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__content">
        <Sidebar />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};
