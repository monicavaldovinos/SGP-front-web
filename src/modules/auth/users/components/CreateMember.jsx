import { useState } from "react";

export default function CreateMemberModal({ onAddMember }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

  const resetForm = () => {
    setName("");
    setUsername("");
    setTeam("");
    setRole("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanUsername = username.trim();
    const cleanTeam = team.trim();
    const cleanRole = role.trim();

    if (!cleanName || !cleanUsername || !cleanTeam || !cleanRole) {
      alert("Completa todos los campos.");
      return;
    }

    onAddMember({
      name: cleanName,
      username: cleanUsername,
      team: cleanTeam,
      role: cleanRole,
    });

    resetForm();

    const modalElement = document.getElementById("createMemberModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  };

  return (
    <div
      className="modal fade"
      id="createMemberModal"
      tabIndex="-1"
      aria-labelledby="createMemberModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="createMemberModalLabel">
                Agregar integrante
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Equipo</label>
                <input
                  type="text"
                  className="form-control"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rol</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetForm}
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
  );
}