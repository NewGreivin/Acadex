function TaskFilter({ estado, titulo, onEstadoChange, onTituloChange }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-md-7">
            <label className="form-label">Buscar por título</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej. Node.js"
              value={titulo}
              onChange={(e) => onTituloChange(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <label className="form-label">Filtrar por estado</label>
            <select
              className="form-select"
              value={estado}
              onChange={(e) => onEstadoChange(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskFilter;
