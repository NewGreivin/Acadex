import { useEffect, useState } from "react";
import { obtenerResumen } from "../services/tareas.service.js";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerResumen()
      .then(setStats)
      .catch(() => setError("No se pudieron cargar los indicadores."));
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!stats) {
    return <p>Cargando indicadores...</p>;
  }

  const tarjetas = [
    { etiqueta: "Total", valor: stats.total, color: "primary" },
    { etiqueta: "Pendientes", valor: stats.pendientes, color: "danger" },
    { etiqueta: "En progreso", valor: stats.progreso, color: "warning" },
    { etiqueta: "Completadas", valor: stats.completadas, color: "success" },
  ];

  return (
    <div>
      <h1 className="mb-4">Resumen de tareas</h1>
      <div className="row">
        {tarjetas.map((t) => (
          <div className="col-md-3 mb-3" key={t.etiqueta}>
            <div className={`card text-bg-${t.color} shadow-sm`}>
              <div className="card-body">
                <h5>{t.etiqueta}</h5>
                <p className="fs-3 fw-bold mb-0">{t.valor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
