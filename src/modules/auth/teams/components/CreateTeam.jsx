import { useState } from "react";

export default function CreateMemberModal({
  onAddMember = () => {},
  proyectosDisponibles = [],
  rolesDisponibles = [],
}) {
  const [names, setNames] = useState("");
  const [lastNameP, setLastNameP] = useState("");
  const [lastNameM, setLastNameM] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [project, setProject] = useState("");
  const [role, setRole] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [salary, setSalary] = useState("");

  const resetForm = () => {
    setNames("");
    setLastNameP("");
    setLastNameM("");
    setUsername("");
    setPassword("");
    setProject("");
    setRole("");
    setEntryDate("");
    setSalary("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanNames = names.trim();
    const cleanLastNameP = lastNameP.trim();
    const cleanLastNameM = lastNameM.trim();
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();
    const cleanSalary = Number(salary);

    if (
      !cleanNames ||
      !cleanLastNameP ||
      !cleanLastNameM ||
      !cleanUsername ||
      !cleanPassword ||
      !project ||
      !role ||
      !entryDate ||
      salary === ""
    ) {
      alert("Completa todos los campos.");
      return;
    }

    if (Number.isNaN(cleanSalary) || cleanSalary < 0) {
      alert("Salario inválido.");
      return;
    }

    onAddMember({
      id: crypto.randomUUID(),
      names: cleanNames,
      lastNameP: cleanLastNameP,
      lastNameM: cleanLastNameM,
      username: cleanUsername,
      password: cleanPassword,
      project,
      role,
      entryDate,
      salary: cleanSalary,
    });

    resetForm();

    const closeBtn = document.getElementById("btnCloseCreateMemberModal");
    if (closeBtn) closeBtn.click();
  };

  return (
    <div
      className="modal fade"
      id="createMemberModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-body">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="m-0">Agregar integrante</h4>

              <button
                id="btnCloseCreateMemberModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <hr />

            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label">
                  <small>Nombre(s)</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Apellido Paterno</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido paterno"
                  value={lastNameP}
                  onChange={(e) => setLastNameP(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Apellido Materno</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido materno"
                  value={lastNameM}
                  onChange={(e) => setLastNameM(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Nombre de usuario</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Contraseña</small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Proyecto</small>
                </label>
                <select
                  className="form-select"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option value="" disabled>
                    Proyecto
                  </option>

                  {(proyectosDisponibles.length
                    ? proyectosDisponibles
                    : ["Proyecto Alpha", "Proyecto Beta", "Proyecto Gamma"]
                  ).map((p) => (
                    <option key={p.id ?? p} value={p.id ?? p}>
                      {p.nombre ?? p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Fecha de ingreso</small>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small>Rol</small>
                </label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Rol
                  </option>

                  {(rolesDisponibles.length
                    ? rolesDisponibles
                    : ["Líder", "Desarrollador", "Tester", "Documentador"]
                  ).map((r) => (
                    <option key={r.id ?? r} value={r.id ?? r}>
                      {r.nombre ?? r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">
                  <small>Salario (quincenal)</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Salario"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  min="0"
                />
              </div>

              <div className="text-end mt-3">
                <button
                  className="btn btn-secondary me-2"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={resetForm}
                >
                  <i className="bi bi-ban"></i>&nbsp;Cancelar
                </button>

                <button className="btn btn-success" type="submit">
                  <i className="bi bi-save"></i>&nbsp;Guardar integrante
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}