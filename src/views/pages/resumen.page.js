import { layout } from "../layout.js";

export function resumenPage(tareas) {
  const total = tareas.length;
  const pendientes = tareas.filter(t => t.estado === "pendiente").length;
  const enProgreso = tareas.filter(t => t.estado === "en progreso").length;
  const completadas = tareas.filter(t => t.estado === "completada").length;

  const contenido = `
    <div class="mb-4">
      <h1>Resumen de tareas</h1>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm text-center">
          <div class="card-body">
            <i class="bi bi-list-task text-primary" style="font-size: 2.5rem;"></i>
            <h6 class="card-title mt-2">Total de tareas</h6>
            <p class="display-6 fw-bold text-primary">${total}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm text-center">
          <div class="card-body">
            <i class="bi bi-exclamation-circle text-danger" style="font-size: 2.5rem;"></i>
            <h6 class="card-title mt-2">Pendientes</h6>
            <p class="display-6 fw-bold text-danger">${pendientes}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm text-center">
          <div class="card-body">
            <i class="bi bi-hourglass-split text-warning" style="font-size: 2.5rem;"></i>
            <h6 class="card-title mt-2">En progreso</h6>
            <p class="display-6 fw-bold text-warning">${enProgreso}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card shadow-sm text-center">
          <div class="card-body">
            <i class="bi bi-check-circle text-success" style="font-size: 2.5rem;"></i>
            <h6 class="card-title mt-2">Completadas</h6>
            <p class="display-6 fw-bold text-success">${completadas}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <a href="/tareas" class="btn btn-primary"><i class="bi bi-arrow-left"></i> Volver a tareas</a>
    </div>
  `;

  return layout("Resumen de tareas", contenido);
}
