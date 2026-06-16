const BASE_URL = import.meta.env.VITE_API_URL;

export function urlReporteXml() {
  return `${BASE_URL}/reportes/xml`;
}

export function urlReportePdf() {
  return `${BASE_URL}/reportes/pdf`;
}
