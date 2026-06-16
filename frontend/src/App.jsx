import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TareasPage from "./pages/TareasPage.jsx";
import DetalleTareaPage from "./pages/DetalleTareaPage.jsx";
import TareaFormPage from "./pages/TareaFormPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tareas" element={<TareasPage />} />
        <Route path="/tareas/nueva" element={<TareaFormPage />} />
        <Route path="/tareas/:id" element={<DetalleTareaPage />} />
        <Route path="/tareas/:id/editar" element={<TareaFormPage />} />
        <Route path="/resumen" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
