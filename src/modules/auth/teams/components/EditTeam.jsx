import { useEffect, useMemo, useState } from "react";

export default function EditTeam({
  team,
  onClose,
  onSave,
  submitting = false,
  proyectos = [],
  miembrosDisponibles = [],
}) {
  const [nombre, setNombre] = useState("");
  const [proyectoId, setProyectoId] = useState("");
  const [liderId, setLiderId] = useState("");
  const [logo, setLogo] = useState("");
  const [miembroSelect, setMiembroSelect] = useState("");
  const [miembrosIds, setMiembrosIds] = useState([]);

  useEffect(() => {
    if (!team) return;

    setNombre(team.nombre || "");
    setProyectoId(team.proyectoId ? String(team.proyectoId) : "");
    setLiderId(team.liderId ? String(team.liderId) : "");
    setLogo(team.logo || "");
    setMiembroSelect("");
    setMiembrosIds(
      Array.isArray(team.miembrosIds) ? team.miembrosIds.map(String) : []
    );
  }, [team]);

  const lideresOptions = useMemo(() => {
    return miembrosDisponibles
      .filter((u) => String(u.id) !== "")
      .filter((u) => !miembrosIds.includes(String(u.id)))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [miembrosDisponibles, miembrosIds]);

  const miembrosOptions = useMemo(() => {
    return miembrosDisponibles
      .filter((u) => String(u.id) !== "")
      .filter((u) => String(u.id) !== String(liderId))
      .filter((u) => !miembrosIds.includes(String(u.id)))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [miembrosDisponibles, liderId, miembrosIds]);

  const handleAddMember = (value) => {
    const id = String(value || "");
    if (!id) return;
    if (id === String(liderId)) return;
    if (miembrosIds.includes(id)) return;

    setMiembrosIds((prev) => [...prev, id]);
    setMiembroSelect("");
  };

  const handleRemoveMember = (id) => {
    setMiembrosIds((prev) => prev.filter((item) => String(item) !== String(id)));
  };

  const handleChangeLeader = (value) => {
    const newLeaderId = String(value || "");
    setLiderId(newLeaderId);

    setMiembrosIds((prev) =>
      prev.filter((id) => String(id) !== newLeaderId)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !proyectoId || !liderId) {
      alert("Completa los campos obligatorios.");
      return;
    }

    onSave({
      nombre: nombre.trim(),
      proyectoId: String(proyectoId),
      liderId: String(liderId),
      miembrosIds: miembrosIds.map(String),
      logo: logo.trim(),
    });
  };

  const getUserName = (id) => {
    const found = miembrosDisponibles.find(
      (u) => String(u.id) === String(id)
    );
    return found?.nombre || id;
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-materials-modal project-modal team-modal-md">
        <form onSubmit={handleSubmit}>
          <h2 className="modal-title-custom text-center mb-4">
            <i className="bi bi-people-fill me-2"></i>
            Editar equipo
          </h2>

          <div className="mb-3">
            <label className="form-label">Nombre del equipo*</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Proyecto*</label>
            <select
              className="form-select"
              value={proyectoId}
              onChange={(e) => setProyectoId(e.target.value)}
            >
              <option value="">Seleccionar proyecto</option>
              {proyectos.map((p) => (
                <option key={p.id} value={String(p.id)}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Líder*</label>
            <select
              className="form-select"
              value={liderId}
              onChange={(e) => handleChangeLeader(e.target.value)}
            >
              <option value="">Seleccionar líder</option>
              {lideresOptions.map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Miembros</label>
            <select
              className="form-select"
              value={miembroSelect}
              onChange={(e) => {
                const value = e.target.value;
                setMiembroSelect(value);
                handleAddMember(value);
              }}
            >
              <option value="">Seleccionar miembro</option>
              {miembrosOptions.map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {u.nombre}
                </option>
              ))}
            </select>

            {miembrosIds.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {miembrosIds.map((id) => (
                  <span key={id} className="team-chip">
                    {getUserName(id)}
                    <button
                      type="button"
                      className="team-chip-btn"
                      onClick={() => handleRemoveMember(id)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Logo</label>
            <input
              type="text"
              className="form-control"
              placeholder="URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end gap-3">
            <button
              type="button"
              className="project-btn-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="project-btn-save"
              disabled={submitting}
            >
              {submitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}