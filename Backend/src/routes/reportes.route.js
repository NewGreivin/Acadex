import { Router } from "express";
import {
  generarReporteXml,
  generarReportePdf,
} from "../controllers/reportes.controller.js";

const router = Router();

router.get("/xml", generarReporteXml);
router.get("/pdf", generarReportePdf);

export default router;
