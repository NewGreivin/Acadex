# Acadex - Frontend

Interfaz de usuario construida con React (Vite), React Router y Bootstrap.
Consume la API de `../backend` mediante `fetch()`; no contiene lógica de
negocio ni acceso a datos.

## Variables de entorno (`.env`)

```
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=Acadex
VITE_APP_VERSION=1.0.0
```

## Scripts

```bash
npm install
npm run dev      # entorno de desarrollo (http://localhost:5173)
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción
npm run lint      # ESLint
```

Ver el README en la raíz del proyecto para una descripción completa de la
estructura y de los endpoints consumidos.
