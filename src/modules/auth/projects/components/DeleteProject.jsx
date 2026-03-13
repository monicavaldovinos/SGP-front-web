export default function DeleteProjectModal({ project, onDeleteProject }) {
  const handleDelete = async () => {
    if (!project) return;

    await onDeleteProject(project.id);

    const closeBtn = document.getElementById("btnCloseDeleteProjectModal");
    if (closeBtn) closeBtn.click();
  };

  return (
    <div
      className="modal fade project-modal"
      id="deleteProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="modal-body text-center">
            <button
              id="btnCloseDeleteProjectModal"
              type="button"
              className="btn-close position-absolute end-0 top-0 m-3"
              data-bs-dismiss="modal"
            ></button>

            <h2 className="modal-title-custom">
              <i className="bi bi-folder-fill me-3"></i>
              Eliminar proyecto
            </h2>

            <p className="fs-4 mt-4">
              ¿Estás seguro de que deseas eliminar el proyecto
              <br />
              “{project?.name || ""}”?
            </p>

            <div className="mt-4">
              <button
                type="button"
                className="project-btn-delete me-3"
                onClick={handleDelete}
              >
                Eliminar
              </button>
              <button
                type="button"
                className="project-btn-save"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}