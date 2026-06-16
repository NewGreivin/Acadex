import { Link } from "react-router-dom";

function HomePage() {
  const appName = import.meta.env.VITE_APP_NAME || "Acadex";
  const appVersion = import.meta.env.VITE_APP_VERSION || "1.0.0";

  return (
    <div className="p-5 mb-4 bg-white rounded-3 shadow-sm">
      <h1 className="display-5 fw-bold">{appName}</h1>
      <p className="fs-5">
        Aplicación web para administrar tareas académicas, ahora separada en
        un Front-End con React y un Back-End con Node.js y Express que expone
        una API JSON.
      </p>
      <p className="text-muted">Versión: {appVersion}</p>
      <Link to="/tareas" className="btn btn-primary me-2">
        <i className="bi bi-list-task"></i> Ver tareas
      </Link>
      <Link to="/tareas/nueva" className="btn btn-outline-primary">
        <i className="bi bi-plus-circle"></i> Crear tarea
      </Link>
    </div>
  );
}

export default HomePage;
