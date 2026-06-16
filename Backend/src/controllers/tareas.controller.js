import { tareas } from "../data/tareas.data.js";

function generarId() {
  return tareas.length > 0 ? Math.max(...tareas.map((t) => t.id)) + 1 : 1;
}

function validarTarea({ titulo, descripcion }) {
  const errores = {};

  if (!titulo || titulo.trim() === "") {
    errores.titulo = "El título es obligatorio";
  }

  if (!descripcion || descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres";
  }

  return errores;
}

// GET /api/tareas?estado=&titulo=
export function listarTareas(req, res) {
  const { estado, titulo } = req.query;
  let resultado = tareas;

  if (estado) {
    resultado = resultado.filter((t) => t.estado === estado);
  }

  if (titulo) {
    const busqueda = titulo.toLowerCase();
    resultado = resultado.filter((t) =>
      t.titulo.toLowerCase().includes(busqueda)
    );
  }

  res.json(resultado);
}

// GET /api/tareas/resumen
export function verResumen(req, res) {
  const stats = {
    total: tareas.length,
    pendientes: tareas.filter((t) => t.estado === "pendiente").length,
    progreso: tareas.filter((t) => t.estado === "en progreso").length,
    completadas: tareas.filter((t) => t.estado === "completada").length,
  };

  res.json(stats);
}

// GET /api/tareas/:id
export function verDetalleTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.json(tarea);
}

// POST /api/tareas
export function crearTarea(req, res) {
  const { titulo, descripcion, estado, prioridad } = req.body;
  const errores = validarTarea({ titulo, descripcion });

  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
  }

  const nuevaTarea = {
    id: generarId(),
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: estado || "pendiente",
    prioridad: prioridad || "media",
  };

  tareas.push(nuevaTarea);

  res.status(201).json(nuevaTarea);
}

// PUT /api/tareas/:id
export function actualizarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const { titulo, descripcion, estado, prioridad } = req.body;
  const errores = validarTarea({ titulo, descripcion });

  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
  }

  tarea.titulo = titulo.trim();
  tarea.descripcion = descripcion.trim();
  tarea.estado = estado || tarea.estado;
  tarea.prioridad = prioridad || tarea.prioridad;

  res.json(tarea);
}

// DELETE /api/tareas/:id
export function eliminarTarea(req, res) {
  const id = Number(req.params.id);
  const indice = tareas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tareas.splice(indice, 1);

  res.json({ mensaje: "Tarea eliminada" });
}
