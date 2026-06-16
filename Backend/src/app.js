import "dotenv/config";
import express from "express";
import cors from "cors";
import tareasRoutes from "./routes/tareas.route.js";
import reportesRoutes from "./routes/reportes.route.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();
const PORT = process.env.PORT || 4000;
const APP_NAME = process.env.APP_NAME || "Acadex";
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Endpoint informativo de la API (ya no genera HTML, solo JSON).
app.get("/api", (req, res) => {
  res.json({
    nombre: APP_NAME,
    version: APP_VERSION,
    mensaje: "API de Acadex disponible",
  });
});

app.use("/api/tareas", tareasRoutes);
app.use("/api/reportes", reportesRoutes);

// Cualquier ruta no definida responde con JSON, no HTML.
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} ejecutándose en http://localhost:${PORT}`);
});
