import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TaskTable from "../components/TaskTable.jsx";
import TaskFilter from "../components/TaskFilter.jsx";
import AlertMessage from "../components/AlertMessage.jsx";
import { obtenerTareas, eliminarTarea } from "../services/tareas.service.js";
import { urlReporteXml, urlReportePdf } from "../services/reportes.service.js";

function TareasPage() {
  const location = useLocation();

  const [tareas, setTareas] = useState([]);
  const [estado, setEstado] = useState("");
  const [titulo, setTitulo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState(
    location.state?.mensaje
      ? { type: "success", message: location.state.mensaje }
      : null
  );

  const cargarTareas = useCallback(async () => {
    setCargando(true);
    try {
      const datos = await obtenerTareas({ estado, titulo });
      setTareas(datos);
    } catch {
      setAlerta({
        type: "danger",
        message: "No se pudieron cargar las tareas.",
      });
    } finally {
      setCargando(false);
    }
  }, [estado, titulo]);

  useEffect(() => {
    cargarTareas();
  }, [cargarTareas]);

  const manejarEliminar = async (id) => {
    try {
      await eliminarTarea(id);
      setAlerta({ type: "success", message: "Tarea eliminada correctamente." });
      cargarTareas();
    } catch {
      setAlerta({ type: "danger", message: "No se pudo eliminar la tarea." });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1>Lista de tareas</h1>
        <div>
          <a
            href={urlReporteXml()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-secondary me-2"
          >
            <i className="bi bi-filetype-xml"></i> XML
          </a>
          <a
            href={urlReportePdf()}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-secondary me-2"
          >
            <i className="bi bi-filetype-pdf"></i> PDF
          </a>
          <Link to="/tareas/nueva" className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Nueva tarea
          </Link>
        </div>
      </div>

      <AlertMessage
        type={alerta?.type}
        message={alerta?.message}
        onClose={() => setAlerta(null)}
      />

      <TaskFilter
        estado={estado}
        titulo={titulo}
        onEstadoChange={setEstado}
        onTituloChange={setTitulo}
      />

      {cargando ? (
        <p>Cargando tareas...</p>
      ) : (
        <TaskTable tareas={tareas} onEliminar={manejarEliminar} />
      )}
    </div>
  );
}

export default TareasPage;
