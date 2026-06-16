import { Router } from "express";
import {
  listarTareas,
  verDetalleTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  verResumen,
} from "../controllers/tareas.controller.js";

const router = Router();

// IMPORTANTE: /resumen debe declararse antes de /:id
// para que Express no lo interprete como un id.
router.get("/resumen", verResumen);

router.get("/", listarTareas);
router.get("/:id", verDetalleTarea);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.delete("/:id", eliminarTarea);

export default router;
