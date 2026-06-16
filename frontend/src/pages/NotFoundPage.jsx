import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="alert alert-danger shadow-sm">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta solicitada no existe.</p>
      <Link to="/" className="btn btn-danger">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFoundPage;
