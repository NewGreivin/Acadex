import { tareas } from "../data/tareas.data.js";

export function listarTareas(req, res) {
  const estado = req.query.estado;
  const mensaje = req.query.mensaje;
  if (estado) {
    const tareasFiltradas = tareas.filter((tarea) => tarea.estado === estado);
    return res.json((tareasFiltradas));
  }
  res.json((tareas));
}

export function verDetalleTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (!tarea) {
    return res.status(404).json({error: "Tarea no encontrada"});
  }
  res.json((tarea));
}

/*
export function mostrarFormularioNuevaTarea(req, res) {
  res.json(nuevaTareaPage({}, {}));
}
*/

export function crearTarea(req, res) {
  const errores = {};
  
  if (!req.body.titulo || req.body.titulo.trim() === "") {
    errores.titulo = "El título es requerido";
  }
  if (!req.body.descripcion || req.body.descripcion.trim().length < 5) {
    errores.descripcion = "La descripción debe tener al menos 5 caracteres";
  }
  
  if (Object.keys(errores).length > 0) {
    return res.json(nuevaTareaPage(errores, req.body));
  }
  
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    prioridad: req.body.prioridad,
  };
  tareas.push(nuevaTarea);
  res.status(201).json({mensaje: "Tarea creada"});
}

/*
export function mostrarFormularioEditarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (!tarea) {
    return res.status(404).json({error: "Tarea no encontrada"});
  }
  res.json(editarTareaPage(tarea));
}
*/

export function actualizarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (!tarea) {
    return res.status(404).json({error: "Tarea no encontrada"});
  }
  
  const errores = {};
  
  if (!req.body.titulo || req.body.titulo.trim() === "") {
    errores.titulo = "El título es requerido";
  }
  if (!req.body.descripcion || req.body.descripcion.trim().length < 5) {
    errores.descripcion = "La descripción debe tener al menos 5 caracteres";
  }
  
  if (Object.keys(errores).length > 0) {
    const tareaConValores = {
      ...tarea,
      ...req.body
    };
    return res.json(editarTareaPage(tareaConValores, errores));
  }
  
  tarea.titulo = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.estado = req.body.estado;
  tarea.prioridad = req.body.prioridad;
  res.json({mensaje: "Tarea actualizada"});
}

export function eliminarTarea(req, res) {
  const id = Number(req.params.id);
  const indice = tareas.findIndex((tarea) => tarea.id === id);
  if (indice !== -1) {
    tareas.splice(indice, 1);
  }
  res.status(404).json({error: "Tarea no encontrada"});
}


export function verResumen(req, res) {
  const resumen = {
    total: tareas.length,
    completadas: tareas.filter(tarea => tarea.estado === "completada").length,
    pendientes: tareas.filter(tarea => tarea.estado === "pendiente").length,
    en_progreso: tareas.filter(tarea => tarea.estado === "en progreso").length
  };
  res.json(resumen);
}
