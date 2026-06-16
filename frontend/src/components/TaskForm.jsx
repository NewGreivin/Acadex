import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const valoresIniciales = {
  titulo: "",
  descripcion: "",
  estado: "pendiente",
  prioridad: "media",
};

function TaskForm({ tareaInicial, onSubmit, erroresServidor = {}, modo = "crear" }) {
  const [datos, setDatos] = useState(valoresIniciales);
  const [erroresLocales, setErroresLocales] = useState({});

  useEffect(() => {
    if (tareaInicial) {
      setDatos({
        titulo: tareaInicial.titulo || "",
        descripcion: tareaInicial.descripcion || "",
        estado: tareaInicial.estado || "pendiente",
        prioridad: tareaInicial.prioridad || "media",
      });
    }
  }, [tareaInicial]);

  const manejarCambio = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  // Reto adicional: validaciones visuales en React antes de llamar al backend.
  const validar = () => {
    const nuevosErrores = {};

    if (!datos.titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio";
    }

    if (datos.descripcion.trim().length < 10) {
      nuevosErrores.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    }

    setErroresLocales(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      onSubmit(datos);
    }
  };

  const errores = { ...erroresLocales, ...erroresServidor };

  return (
    <form onSubmit={manejarSubmit} noValidate>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className={`form-control ${errores.titulo ? "is-invalid" : ""}`}
            value={datos.titulo}
            onChange={(e) => manejarCambio("titulo", e.target.value)}
          />
          <div className="invalid-feedback">{errores.titulo || ""}</div>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={datos.estado}
            onChange={(e) => manejarCambio("estado", e.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
          rows="4"
          value={datos.descripcion}
          onChange={(e) => manejarCambio("descripcion", e.target.value)}
        ></textarea>
        <div className="invalid-feedback">{errores.descripcion || ""}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Prioridad</label>
        <select
          className="form-select"
          value={datos.prioridad}
          onChange={(e) => manejarCambio("prioridad", e.target.value)}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <button
        type="submit"
        className={`btn btn-${modo === "editar" ? "warning" : "primary"} me-2`}
      >
        <i className={`bi bi-${modo === "editar" ? "pencil" : "save"}`}></i>{" "}
        {modo === "editar" ? "Actualizar" : "Guardar"}
      </button>
      <Link to="/tareas" className="btn btn-secondary">
        Cancelar
      </Link>
    </form>
  );
}

export default TaskForm;
