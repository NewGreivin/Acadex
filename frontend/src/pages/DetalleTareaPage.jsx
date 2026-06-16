import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage.jsx";
import { obtenerTareaPorId } from "../services/tareas.service.js";

function DetalleTareaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tarea, setTarea] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerTareaPorId(id)
      .then(setTarea)
      .catch(() => setError("No se encontró la tarea solicitada."));
  }, [id]);

  if (error) {
    return (
      <div>
        <AlertMessage type="danger" message={error} />
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/tareas")}
        >
          Volver
        </button>
      </div>
    );
  }

  if (!tarea) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        Detalle de tarea
      </div>
      <div className="card-body">
        <h1 className="card-title">{tarea.titulo}</h1>
        <p>
          <strong>Descripción:</strong> {tarea.descripcion}
        </p>
        <p>
          <strong>Estado:</strong> {tarea.estado}
        </p>
        <p>
          <strong>Prioridad:</strong> {tarea.prioridad}
        </p>

        <Link to="/tareas" className="btn btn-secondary me-2">
          Volver
        </Link>
        <Link to={`/tareas/${tarea.id}/editar`} className="btn btn-warning">
          Editar
        </Link>
      </div>
    </div>
  );
}

export default DetalleTareaPage;
