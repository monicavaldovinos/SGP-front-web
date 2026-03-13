import { useState } from "react";

export default function CreateTeamModal({ onAddTeam }) {

  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [leader, setLeader] = useState("");
  const [members, setMembers] = useState("");
  const [logo, setLogo] = useState("");

  const resetForm = () => {
    setName("");
    setProject("");
    setLeader("");
    setMembers("");
    setLogo("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name || !project || !leader) {

      alert("Completa los campos obligatorios");
      return;

    }

    await onAddTeam();

    resetForm();

    document.getElementById("btnCloseCreateTeamModal")?.click();
  };

  return (

    <div
      className="modal fade"
      id="createTeamModal"
      tabIndex="-1"
      data-bs-backdrop="static"
    >

      <div className="modal-dialog modal-dialog-centered modal-lg">

        <div className="modal-content p-4">

          <div className="modal-body">

            <div className="d-flex justify-content-between align-items-center">

              <h3>
                <i className="bi bi-people-fill me-2"></i>
                Crear equipo
              </h3>

              <button
                id="btnCloseCreateTeamModal"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <hr />

            <form onSubmit={handleSubmit} className="row g-3">

              <div className="col-12">
                <label className="form-label">Nombre del equipo*</label>
                <input
                  className="form-control"
                  placeholder="Nombre del equipo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Proyecto*</label>
                <select
                  className="form-select"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option>Seleccionar proyecto</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Líder*</label>
                <select
                  className="form-select"
                  value={leader}
                  onChange={(e) => setLeader(e.target.value)}
                >
                  <option>Seleccionar líder</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Miembros*</label>
                <select
                  className="form-select"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                >
                  <option>Seleccionar miembro</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Logo</label>
                <input
                  className="form-control"
                  placeholder="URL"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </div>

              <div className="text-end mt-4">

                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                  onClick={resetForm}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Crear equipo
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}