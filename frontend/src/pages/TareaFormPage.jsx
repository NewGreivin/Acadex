import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";
import AlertMessage from "../components/AlertMessage.jsx";
import {
  actualizarTarea,
  crearTarea,
  obtenerTareaPorId,
} from "../services/tareas.service.js";

function TareaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [tarea, setTarea] = useState(null);
  const [erroresServidor, setErroresServidor] = useState({});
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    if (esEdicion) {
      obtenerTareaPorId(id)
        .then(setTarea)
        .catch(() =>
          setAlerta({ type: "danger", message: "No se encontró la tarea." })
        );
    }
  }, [id, esEdicion]);

  const manejarSubmit = async (datos) => {
    try {
      setErroresServidor({});
      if (esEdicion) {
        await actualizarTarea(id, datos);
        navigate("/tareas", {
          state: { mensaje: "Tarea actualizada correctamente" },
        });
      } else {
        await crearTarea(datos);
        navigate("/tareas", {
          state: { mensaje: "Tarea creada correctamente" },
        });
      }
    } catch (error) {
      if (error.errores) {
        setErroresServidor(error.errores);
      } else {
        setAlerta({
          type: "danger",
          message: "Ocurrió un error al guardar la tarea.",
        });
      }
    }
  };

  if (esEdicion && !tarea && !alerta) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="card shadow-sm">
      <div
        className={`card-header ${
          esEdicion ? "bg-warning" : "bg-primary text-white"
        }`}
      >
        {esEdicion ? "Editar tarea" : "Registrar nueva tarea"}
      </div>
      <div className="card-body">
        <AlertMessage
          type={alerta?.type}
          message={alerta?.message}
          onClose={() => setAlerta(null)}
        />
        <TaskForm
          tareaInicial={tarea}
          onSubmit={manejarSubmit}
          erroresServidor={erroresServidor}
          modo={esEdicion ? "editar" : "crear"}
        />
      </div>
    </div>
  );
}

export default TareaFormPage;
