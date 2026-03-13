export default function ViewProjectModal({ project }) {
  return (
    <div
      className="modal fade project-modal"
      id="viewProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content p-4">
          <div className="modal-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="modal-title-custom">
                <i className="bi bi-folder-fill me-3"></i>
                Ver Proyecto
              </h2>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Nombre del Proyecto</label>
                <input
                  type="text"
                  className="form-control"
                  value={project?.name || ""}
                  disabled
                />
              </div>

              <div className="col-12">
                <label className="form-label">Equipo</label>
                <input
                  type="text"
                  className="form-control"
                  value={project?.team || ""}
                  disabled
                />
              </div>

              <div className="col-12">
                <label className="form-label">Presupuesto</label>
                <input
                  type="text"
                  className="form-control"
                  value={project?.budget || ""}
                  disabled
                />
              </div>

              <div className="col-6">
                <label className="form-label">Fecha de inicio</label>
                <input
                  type="text"
                  className="form-control"
                  value={project?.startDate || ""}
                  disabled
                />
              </div>

              <div className="col-6">
                <label className="form-label">Fecha de fin</label>
                <input
                  type="text"
                  className="form-control"
                  value={project?.endDate || ""}
                  disabled
                />
              </div>

              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={project?.description || ""}
                  disabled
                ></textarea>
              </div>

              <div className="col-12 mt-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#materialsProjectModal"
                >
                  <i className="bi bi-stack me-2"></i>
                  Ver materiales
                </button>
              </div>

              <div className="col-12 text-end mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}