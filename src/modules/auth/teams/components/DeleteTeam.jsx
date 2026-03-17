export default function DeleteTeam({
  team,
  onClose,
  onDelete,
  submitting = false,
}) {
  return (
    <div className="custom-modal-backdrop">
      <div className="custom-materials-modal project-modal" style={{ maxWidth: "820px" }}>
        <h2 className="modal-title-custom text-center mb-4">
          <i className="bi bi-people-fill me-2"></i>
          Eliminar equipo
        </h2>

        <p className="text-center" style={{ fontSize: "2rem", lineHeight: "1.5" }}>
          ¿Estás seguro de que deseas eliminar el equipo <br />
          <strong>“{team?.nombre || "Alfa"}”</strong>?
        </p>

        <div className="d-flex justify-content-center gap-4 mt-5">
          <button
            className="project-btn-cancel"
            onClick={onClose}
            disabled={submitting}
          >
            Cancelar
          </button>

          <button
            className="project-btn-delete"
            onClick={onDelete}
            disabled={submitting}
          >
            {submitting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}