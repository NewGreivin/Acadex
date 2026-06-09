export function layout(titulo, contenido) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${titulo}</title>

      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      >
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    </head>

    <body class="bg-light d-flex flex-column min-vh-100">

      <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <i class="bi bi-list-task"></i> Plataforma de Tareas
          </a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav ms-auto">
              <a class="nav-link" href="/">
                <i class="bi bi-house-fill"></i> Inicio
              </a>
              <a class="nav-link" href="/tareas">
                <i class="bi bi-list-task"></i> Tareas
              </a>
              <a class="nav-link" href="/tareas/resumen">
                <i class="bi bi-bar-chart"></i> Resumen
              </a>
              <a class="nav-link" href="/tareas/nueva">
                <i class="bi bi-plus-circle"></i> Nueva tarea
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="container flex-grow-1">
        ${contenido}
      </main>

      <footer class="bg-dark text-white text-center py-2" style="font-size: 0.875rem;">
        <p class="mb-0"><i class="bi bi-info-circle"></i> ${process.env.APP_NAME} v${process.env.APP_VERSION} © ${new Date().getFullYear()}</p>
      </footer>

      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
      </script>
    </body>
    </html>
  `;
}