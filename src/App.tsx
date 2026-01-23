import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import Login from "./pages/Login/Login";
import CharacterList from "./pages/Characters/CharacterList";
import CharacterForm from "./pages/Characters/CharacterForm";
import DashboardLayout from "./layouts/DashboardLayout";
import PlanetList from "./pages/Planets/PlanetList";
import CharacterDetail from "./pages/Characters/CharacterDetail";
import PlanetDetail from "./pages/Planets/PlanetDetail";
import NotFound from "./pages/Status/NotFound";
import Unauthorized from "./pages/Status/Unauthorized";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
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
        path="/characters/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CharacterDetail />
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

      <Route
        path="/characters/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <CharacterForm />
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
        path="/planets/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PlanetDetail />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={
          <DashboardLayout>
            <Unauthorized />
          </DashboardLayout>
        }
      />

      <Route
        path="*"
        element={
          <DashboardLayout>
            <NotFound />
          </DashboardLayout>
        }
      />
    </Routes>
    </>
  );
}


export default App;

