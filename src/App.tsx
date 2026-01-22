import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Login from "./pages/Login/Login";
import CharacterList from "./pages/Characters/CharacterList";
import CharacterForm from "./pages/Characters/CharacterForm";
import DashboardLayout from "./layouts/DashboardLayout";
import PlanetList from "./pages/Planets/PlanetList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CharacterList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/planets"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlanetList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/characters/new"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <CharacterForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
