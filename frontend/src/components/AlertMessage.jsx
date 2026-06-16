function AlertMessage({ type = "info", message, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`alert alert-${type} d-flex justify-content-between align-items-center shadow-sm`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
      )}
    </div>
  );
}

export default AlertMessage;
