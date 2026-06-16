// Almacenamiento en memoria de las tareas.
// En un escenario real esto vendría de una base de datos.
export const tareas = [
  {
    id: 1,
    titulo: "Investigar Node.js",
    descripcion:
      "Consultar qué es Node.js y cómo se utiliza en aplicaciones web.",
    estado: "pendiente",
    prioridad: "alta",
  },
  {
    id: 2,
    titulo: "Practicar rutas con Express",
    descripcion: "Crear rutas que expongan datos en formato JSON.",
    estado: "en progreso",
    prioridad: "media",
  },
  {
    id: 3,
    titulo: "Documentar la API REST",
    descripcion:
      "Redactar la documentación de los endpoints disponibles para probarlos en Postman.",
    estado: "completada",
    prioridad: "baja",
  },
];
