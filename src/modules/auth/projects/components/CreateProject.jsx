import { useState } from "react";

export default function CreateProjectModal({ onAddProject, miembrosDisponibles = [] }) {
  const [name, setName] = useState("");
  const [member, setMember] = useState(""); // miembro seleccionado
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logo, setLogo] = useState("");

  const resetForm = () => {
    setName("");
    setMember("");
    setBudget("");
    setStartDate("");
    setEndDate("");
    setLogo("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanLogo = logo.trim();
    const cleanBudget = Number(budget);

    if (!cleanName || !member || budget === "" || !startDate || !endDate || !cleanLogo) {
      alert("Completa todos los campos.");
      return;
    }

    if (Number.isNaN(cleanBudget) || cleanBudget < 0) {
      alert("Presupuesto inválido.");
      return;
    }

    if (endDate < startDate) {
      alert("La fecha de fin no puede ser menor que la fecha de inicio.");
      return;
    }

    onAddProject({
      name: cleanName,
      member,            // miembro seleccionado
      budget: cleanBudget,
      startDate,
      endDate,
      logo: cleanLogo,
    });

    resetForm();

    const closeBtn = document.getElementById("btnCloseCreateProjectModal");
    if (closeBtn) closeBtn.click();
  };

  return (
    <div
      className="modal fade"
      id="createProjectModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-body">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="m-0">Registrar proyecto</h4>

              <button
                id="btnCloseCreateProjectModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <hr />

            <form className="row g-3" onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="col-12">
                <label className="form-label">
                  <small>Nombre del proyecto</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del proyecto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Miembros (select) */}
              <div className="col-12">
                <label className="form-label">
                  <small>Miembros</small>
                </label>
                <select
                  className="form-select"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona un miembro
                  </option>

                  {/* Si NO pasas lista, te dejo opciones default */}
                  {(miembrosDisponibles.length ? miembrosDisponibles : ["Moni", "Naoly", "Pau", "Yos"]).map(
                    (m) => (
                      <option key={m.id ?? m} value={m.id ?? m}>
                        {m.nombre ?? m}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Presupuesto */}
              <div className="col-12">
                <label className="form-label">
                  <small>Presupuesto</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min="0"
                />
              </div>

              {/* Fechas */}
              <div className="col-6">
                <label className="form-label">
                  <small>Fecha de inicio</small>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="col-6">
                <label className="form-label">
                  <small>Fecha de fin</small>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Logo */}
              <div className="col-12">
                <label className="form-label">
                  <small>Logo</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="URL o nombre del logo"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
              </div>

              {/* Botones */}
              <div className="text-end mt-3">
                <button
                  className="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={resetForm}
                >
                  <i className="bi bi-ban"></i>
                  &nbsp;Cancelar
                </button>

                <button className="btn btn-success" type="submit">
                  <i className="bi bi-save"></i>
                  &nbsp;Guardar proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}