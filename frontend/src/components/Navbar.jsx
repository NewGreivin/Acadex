import { NavLink } from "react-router-dom";

function Navbar() {
  const appName = import.meta.env.VITE_APP_NAME || "Acadex";

  const claseLink = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <i className="bi bi-journal-check"></i> {appName}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className={claseLink} to="/" end>
              <i className="bi bi-house"></i> Inicio
            </NavLink>
            <NavLink className={claseLink} to="/tareas">
              <i className="bi bi-list-task"></i> Tareas
            </NavLink>
            <NavLink className={claseLink} to="/tareas/nueva">
              <i className="bi bi-plus-circle"></i> Nueva tarea
            </NavLink>
            <NavLink className={claseLink} to="/resumen">
              <i className="bi bi-bar-chart"></i> Resumen
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
