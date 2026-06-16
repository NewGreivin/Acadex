const API_URL = `${import.meta.env.VITE_API_URL}/tareas`;

async function manejarRespuesta(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error || "Ocurrió un error en la solicitud");
    error.status = response.status;
    error.errores = data?.errores;
    throw error;
  }

  return data;
}

// GET /api/tareas?estado=&titulo=
export async function obtenerTareas({ estado = "", titulo = "" } = {}) {
  const params = new URLSearchParams();
  if (estado) params.set("estado", estado);
  if (titulo) params.set("titulo", titulo);

  const query = params.toString();
  const response = await fetch(query ? `${API_URL}?${query}` : API_URL);
  return manejarRespuesta(response);
}

// GET /api/tareas/:id
export async function obtenerTareaPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return manejarRespuesta(response);
}

// POST /api/tareas
export async function crearTarea(datos) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(response);
}

// PUT /api/tareas/:id
export async function actualizarTarea(id, datos) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(response);
}

// DELETE /api/tareas/:id
export async function eliminarTarea(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return manejarRespuesta(response);
}

// GET /api/tareas/resumen
export async function obtenerResumen() {
  const response = await fetch(`${API_URL}/resumen`);
  return manejarRespuesta(response);
}
