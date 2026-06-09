import "dotenv/config";
import express from "express";
import tareasRoutes from "./routes/tareas.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { homePage } from "./views/pages/home.page.js";
import { error404Page } from "./views/pages/error404.page.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send(homePage(process.env.APP_NAME, process.env.APP_VERSION));
});

app.use("/api/tareas", tareasRoutes);

app.use((req, res) => {
  res.status(404).json({error: "Ruta no encontrada"});
});

app.listen(PORT, () => {
  console.log(
    `${process.env.APP_NAME} ejecutándose en http://localhost:${PORT}`
  );
});
