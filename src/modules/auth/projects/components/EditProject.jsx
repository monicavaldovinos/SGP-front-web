import { useEffect, useState } from "react";

export default function EditProjectModal({ project, onEditProject }) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setTeam(project.team || "");
      setBudget(project.budget || "");
      setStartDate(project.startDate || "");
      setEndDate(project.endDate || "");
      setDescription(project.description || "");
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project) return;

    await onEditProject(project.id, {
      nombre: name,
      equipo: team,
      presupuestoTotal: Number(budget),
      fechaInicio: startDate,
      fechaFin: endDate,
      descripcion: description,
    });

    const closeBtn = document.getElementById("btnCloseEditProjectModal");
    if (closeBtn) closeBtn.click();
  };

  return (
    <div
      className="modal fade project-modal"
      id="editProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content p-4">
          <div className="modal-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="modal-title-custom">
                <i className="bi bi-folder-fill me-3"></i>
                Editar Proyecto
              </h2>

              <button
                id="btnCloseEditProjectModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label className="form-label">Nombre del Proyecto</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Equipo</label>
                <input
                  type="text"
                  className="form-control"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Presupuesto</label>
                <input
                  type="number"
                  className="form-control"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Fecha de inicio</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="col-6">
                <label className="form-label">Fecha de fin</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  className="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}