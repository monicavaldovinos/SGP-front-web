import { useState } from "react";

export default function CreateLeaderModal({ onAddLeader = () => {}, equiposDisponibles = [] }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");

  const resetForm = () => {
    setName("");
    setUsername("");
    setPassword("");
    setTeam("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanUsername || !cleanPassword || !team) {
      alert("Completa todos los campos.");
      return;
    }

    onAddLeader({
      id: crypto.randomUUID(),
      name: cleanName,
      username: cleanUsername,
      password: cleanPassword, // luego lo quitas cuando haya backend
      team,
    });

    resetForm();

    const closeBtn = document.getElementById("btnCloseCreateLeaderModal");
    if (closeBtn) closeBtn.click();
  };

  return (
    <div
      className="modal fade"
      id="createLeaderModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-body">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="m-0">Agregar líder</h4>

              <button
                id="btnCloseCreateLeaderModal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <hr />

            <form className="row g-3" onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="col-md-6">
                <label className="form-label">
                  <small>Nombre completo</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Usuario */}
              <div className="col-md-6">
                <label className="form-label">
                  <small>Usuario</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Contraseña */}
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

              {/* Equipo */}
              <div className="col-md-6">
                <label className="form-label">
                  <small>Equipo</small>
                </label>
                <select
                  className="form-select"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona un equipo
                  </option>

                  {(equiposDisponibles.length
                    ? equiposDisponibles
                    : ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"]
                  ).map((t) => (
                    <option key={t.id ?? t} value={t.id ?? t}>
                      {t.name ?? t.nombre ?? t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botones */}
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
                  <i className="bi bi-save"></i>&nbsp;Guardar líder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}