import { layout } from "../layout.js";

export function nuevaTareaPage(errores = {}, valores = {}) {
  const claseTitulo = errores.titulo ? "form-control is-invalid" : "form-control";
  const claseDescripcion = errores.descripcion ? "form-control is-invalid" : "form-control";
  
  return layout(
    "Nueva tarea",
    `
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              Registrar nueva tarea
            </div>
            <div class="card-body">
              <form action="/tareas" method="POST">
                <div class="mb-3">
                  <label class="form-label">Título</label>
                  <input type="text" name="titulo" class="${claseTitulo}" value="${valores.titulo || ""}">
                  ${errores.titulo ? `<div class="invalid-feedback d-block">${errores.titulo}</div>` : ""}
                </div>
                <div class="mb-3">
                  <label class="form-label">Descripción</label>
                  <textarea name="descripcion" class="${claseDescripcion}" rows="4">${valores.descripcion || ""}</textarea>
                  ${errores.descripcion ? `<div class="invalid-feedback d-block">${errores.descripcion}</div>` : ""}
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Estado</label>
                      <select name="estado" class="form-select">
                        <option value="pendiente" ${valores.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="en progreso" ${valores.estado === "en progreso" ? "selected" : ""}>En progreso</option>
                        <option value="completada" ${valores.estado === "completada" ? "selected" : ""}>Completada</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Prioridad</label>
                      <select name="prioridad" class="form-select">
                        <option value="baja" ${valores.prioridad === "baja" ? "selected" : ""}>Baja</option>
                        <option value="media" ${valores.prioridad === "media" ? "selected" : ""}>Media</option>
                        <option value="alta" ${valores.prioridad === "alta" ? "selected" : ""}>Alta</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary"><i class="bi bi-check"></i> Guardar</button>
                <a href="/tareas" class="btn btn-secondary"><i class="bi bi-x"></i> Cancelar</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  );
}
      </div>
    `
  );
}