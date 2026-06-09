function App() {
  return (
    <div className="p-5 mb-4 bg-white rounded-3 shadow-sm">
      <h1 className="display-5 fw-bold">
        ${"{"}appName{"}"}
      </h1>
      <p className="fs-5">
        Aplicación web para administrar tareas académicas utilizando Node.js,
        Express y Bootstrap.
      </p>
      <p className="text-muted">
        Versión: ${"{"}appVersion{"}"}
      </p>
      <a href="/tareas" className="btn btn-primary">
        Ver tareas
      </a>
      <a href="/tareas/nueva" className="btn btn-outline-primary">
        Crear tarea
      </a>
    </div>
  );
}

export default App;
