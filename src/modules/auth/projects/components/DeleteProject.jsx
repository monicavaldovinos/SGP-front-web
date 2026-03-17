export default function DeleteProjectModal({
  project,
  onDeleteProject,
  onClose,
  submitting = false,
}) {
  const handleDelete = async () => {
    if (!project) return;
    await onDeleteProject(project.id);
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal-box project-modal text-center">
        <h2 className="modal-title-custom">
          <i className="bi bi-folder-fill me-3"></i>
          Eliminar proyecto
        </h2>

        <p className="fs-4 mt-4">
          ¿Estás seguro de que deseas eliminar el proyecto
          <br />
          “{project?.name || ""}”?
        </p>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <button
            type="button"
            className="project-btn-cancel"
            onClick={onClose}
            disabled={submitting}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="project-btn-delete"
            onClick={handleDelete}
            disabled={submitting}
          >
            {submitting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}