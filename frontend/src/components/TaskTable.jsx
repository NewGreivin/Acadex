import { Link } from "react-router-dom";

function obtenerBadgeEstado(estado) {
  if (estado === "pendiente") return "bg-danger";
  if (estado === "en progreso") return "bg-warning text-dark";
  if (estado === "completada") return "bg-success";
  return "bg-secondary";
}

function obtenerBadgePrioridad(prioridad) {
  if (prioridad === "alta") return "bg-danger";
  if (prioridad === "media") return "bg-warning text-dark";
  if (prioridad === "baja") return "bg-success";
  return "bg-secondary";
}

function TaskTable({ tareas, onEliminar }) {
  if (tareas.length === 0) {
    return <div className="alert alert-info">No hay tareas registradas.</div>;
  }

  const manejarEliminar = (tarea) => {
    // Reto adicional: confirmación antes de eliminar.
    const confirmado = window.confirm(
      `¿Seguro que desea eliminar la tarea "${tarea.titulo}"?`
    );
    if (confirmado) {
      onEliminar(tarea.id);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>
                <span className={`badge ${obtenerBadgeEstado(tarea.estado)}`}>
                  <i className="bi bi-flag"></i> {tarea.estado}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${obtenerBadgePrioridad(tarea.prioridad)}`}
                >
                  {tarea.prioridad}
                </span>
              </td>
              <td>
                <Link
                  to={`/tareas/${tarea.id}`}
                  className="btn btn-sm btn-outline-primary me-1"
                  title="Ver detalle"
                >
                  <i className="bi bi-eye"></i>
                </Link>

                <Link
                  to={`/tareas/${tarea.id}/editar`}
                  className="btn btn-sm btn-outline-warning me-1"
                  title="Editar"
                >
                  <i className="bi bi-pencil"></i>
                </Link>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  title="Eliminar"
                  onClick={() => manejarEliminar(tarea)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
