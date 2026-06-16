# Acadex

Aplicación de gestión de tareas académicas, separada en dos proyectos
independientes según lo solicitado en el laboratorio "Conversión de una app
Node.js en una aplicación separada con Frontend React, Backend JSON y
reportes XML/PDF":

- **backend/** — Node.js + Express. Expone únicamente datos en formato JSON
  a través de `/api/tareas` y genera reportes en `/api/reportes`.
- **frontend/** — React (Vite) + React Router + Bootstrap. Consume la API
  mediante `fetch()` y reemplaza por completo el renderizado de HTML que
  antes hacía Express.

## Cómo ejecutar el proyecto

### 1. Backend

```bash
cd backend
npm install
npm run dev      # con nodemon, o "npm start" para producción
```

El backend queda disponible en `http://localhost:4000`.

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en `http://localhost:5173` y consume la API
configurada en `frontend/.env` (`VITE_API_URL`).

## Endpoints de la API

| Método | Ruta                  | Descripción                          |
| ------ | --------------------- | ------------------------------------- |
| GET    | /api/tareas            | Lista tareas (admite `?estado=` y `?titulo=`) |
| GET    | /api/tareas/resumen     | Indicadores (total, pendientes, etc.) |
| GET    | /api/tareas/:id         | Detalle de una tarea                  |
| POST   | /api/tareas             | Crea una tarea                        |
| PUT    | /api/tareas/:id         | Actualiza una tarea                   |
| DELETE | /api/tareas/:id         | Elimina una tarea                     |
| GET    | /api/reportes/xml       | Reporte de tareas en XML              |
| GET    | /api/reportes/pdf       | Reporte de tareas en PDF              |

## Estructura del frontend

- `src/layouts/MainLayout.jsx` — layout general (Navbar + contenido + Footer).
- `src/pages/` — páginas: Inicio, Tareas, Detalle, Formulario (crear/editar),
  Resumen (dashboard) y 404.
- `src/components/` — componentes reutilizables: `Navbar`, `Footer`,
  `TaskTable`, `TaskFilter`, `TaskForm`, `AlertMessage`.
- `src/services/` — funciones `fetch()` para hablar con el backend.

## Retos adicionales implementados

- Búsqueda de tareas por título (`TaskFilter`, parámetro `?titulo=`).
- Validaciones visuales en el formulario de React (`TaskForm`).
- Confirmación antes de eliminar una tarea (`TaskTable`).
- Página "Resumen" con indicadores y métricas (`DashboardPage`).
