import { tareas } from "../data/tareas.data.js";
import PDFDocument from "pdfkit";

function escaparXml(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// GET /api/reportes/xml
export function generarReporteXml(req, res) {
  const filas = tareas
    .map(
      (t) => `
  <tarea id="${t.id}">
    <titulo>${escaparXml(t.titulo)}</titulo>
    <descripcion>${escaparXml(t.descripcion)}</descripcion>
    <estado>${escaparXml(t.estado)}</estado>
    <prioridad>${escaparXml(t.prioridad)}</prioridad>
  </tarea>`
    )
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<reporte generadoEn="${new Date().toISOString()}">\n` +
    `<tareas total="${tareas.length}">${filas}\n</tareas>\n` +
    `</reporte>`;

  res.set("Content-Type", "application/xml");
  res.send(xml);
}

// GET /api/reportes/pdf
export function generarReportePdf(req, res) {
  const doc = new PDFDocument({ margin: 50 });

  res.set("Content-Type", "application/pdf");
  res.set("Content-Disposition", 'inline; filename="reporte-tareas.pdf"');

  doc.pipe(res);

  doc.fontSize(18).fillColor("#0d6efd").text("Reporte de tareas - Acadex", {
    align: "center",
  });
  doc.moveDown(0.3);
  doc
    .fontSize(10)
    .fillColor("gray")
    .text(`Generado: ${new Date().toLocaleString()}`, { align: "center" });
  doc.moveDown(1.5);

  if (tareas.length === 0) {
    doc.fontSize(12).fillColor("black").text("No hay tareas registradas.");
  }

  tareas.forEach((tarea, indice) => {
    doc
      .fontSize(13)
      .fillColor("#0d6efd")
      .text(`${indice + 1}. ${tarea.titulo}`);

    doc
      .fontSize(10)
      .fillColor("black")
      .text(`Descripción: ${tarea.descripcion}`)
      .text(`Estado: ${tarea.estado}      Prioridad: ${tarea.prioridad}`)
      .moveDown(0.8);
  });

  doc.end();
}
