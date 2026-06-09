import { layout } from "../layout.js";

function obtenerBadgeEstado(estado) {
  if (estado === "pendiente") return "bg-danger";
  if (estado === "en progreso") return "bg-warning text-dark";
  if (estado === "completada") return "bg-success";
  return "bg-secondary";
}

function obtenerBadgePrioridad(prioridad) {
  if (prioridad === "alta") return `<span class="badge bg-danger"><i class="bi bi-exclamation-lg"></i> Alta</span>`;
  if (prioridad === "media") return `<span class="badge bg-warning text-dark"><i class="bi bi-dash-lg"></i> Media</span>`;
  if (prioridad === "baja") return `<span class="badge bg-success"><i class="bi bi-check-lg"></i> Baja</span>`;
  return `<span class="badge bg-secondary">Desconocida</span>`;
}

function obtenerAlertaMensaje(mensaje) {
  if (mensaje === "creada") {
    return `<div class="alert alert-success alert-dismissible fade show" role="alert">
    ¡Tarea creada correctamente!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  }
  if (mensaje === "actualizada") {
    return `<div class="alert alert-info alert-dismissible fade show" role="alert">
      ¡Tarea actualizada correctamente!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  }
  if (mensaje === "eliminada") {
    return `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    ¡Tarea eliminada correctamente!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  }
  return '';
}

export function tareasPage(tareas, mensaje) {
  let contenido = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Lista de tareas</h1>
      <a href="/tareas/nueva" class="btn btn-primary"><i class="bi bi-plus"></i> Nueva tarea</a>
    </div>

    ${mensaje ? obtenerAlertaMensaje(mensaje) : ''}

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <form method="GET" action="/tareas" class="row g-3 align-items-end">
          <div class="col-md-8">
            <label class="form-label">Filtrar por estado</label>
            <select name="estado" class="form-select">
              <option value="">Todas</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div class="col-md-4">
            <button type="submit" class="btn btn-outline-primary w-100">
              <i class="bi bi-funnel"></i> Filtrar
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (tareas.length === 0) {
    contenido += `
      <div class="alert alert-info">
        No hay tareas registradas.
      </div>
    `;
  } else {
    contenido += `
      <div class="table-responsive">
        <table class="table table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
    `;

    tareas.forEach((tarea) => {
      contenido += `
            <tr>
              <td><strong>${tarea.titulo}</strong></td>
              <td>${tarea.descripcion}</td>
              <td><span class="badge ${obtenerBadgeEstado(tarea.estado)}">${tarea.estado}</span></td>
              <td>${obtenerBadgePrioridad(tarea.prioridad)}</td>
              <td>
                <a href="/tareas/${tarea.id}" class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-eye"></i> Ver
                </a>
                <a href="/tareas/${tarea.id}/editar" class="btn btn-sm btn-outline-warning">
                  <i class="bi bi-pencil"></i> Editar
                </a>
                <form action="/tareas/${tarea.id}/eliminar" method="POST" class="d-inline">
                  <button type="submit" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </form>
              </td>
            </tr>
      `;
    });

    contenido += `
          </tbody>
        </table>
      </div>
    `;
  }

  return layout("Tareas", contenido);
}