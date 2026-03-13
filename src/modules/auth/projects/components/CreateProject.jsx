import { useState } from "react";

export default function CreateProjectModal({ onAddProject }) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [materialQuery, setMaterialQuery] = useState("");

  const [materials, setMaterials] = useState([
    {
      id: 1,
      nombre: "Cemento Portland",
      serie: "SER-001",
      ubicacion: "Bodega A",
      fechaAdquisicion: "2026-05-10",
      cantidad: 50,
      estado: "Disponible",
      descripcion: "Material de construcción",
      tipo: "CEMEX",
      precio: 150,
    },
    {
      id: 2,
      nombre: 'Varilla 3/8"',
      serie: "SER-002",
      ubicacion: "Bodega B",
      fechaAdquisicion: "2026-05-12",
      cantidad: 200,
      estado: "Disponible",
      descripcion: "Varilla de acero",
      tipo: "Aceros SA",
      precio: 85,
    },
    {
      id: 3,
      nombre: "Arena",
      serie: "SER-003",
      ubicacion: "Patio",
      fechaAdquisicion: "2026-05-15",
      cantidad: 10,
      estado: "Disponible",
      descripcion: "Arena fina",
      tipo: "Agregados del Sur",
      precio: 350,
    },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    nombre: "",
    serie: "",
    ubicacion: "",
    fechaAdquisicion: "",
    cantidad: 1,
    estado: "Disponible",
    descripcion: "",
    tipo: "",
    precio: "",
  });

  const resetForm = () => {
    setName("");
    setTeam("");
    setBudget("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setMaterialQuery("");
    setShowMaterialsModal(false);
    setShowAddMaterialModal(false);
  };

  const resetMaterialForm = () => {
    setNewMaterial({
      nombre: "",
      serie: "",
      ubicacion: "",
      fechaAdquisicion: "",
      cantidad: 1,
      estado: "Disponible",
      descripcion: "",
      tipo: "",
      precio: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanTeam = team.trim();
    const cleanDescription = description.trim();
    const cleanBudget = Number(budget);

    if (
      !cleanName ||
      !cleanTeam ||
      budget === "" ||
      !startDate ||
      !endDate ||
      !cleanDescription
    ) {
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

    await onAddProject({
      nombre: cleanName,
      equipo: cleanTeam,
      presupuestoTotal: cleanBudget,
      fechaInicio: startDate,
      fechaFin: endDate,
      descripcion: cleanDescription,
    });

    resetForm();

    const closeBtn = document.getElementById("btnCloseCreateProjectModal");
    if (closeBtn) closeBtn.click();
  };

  const filteredMaterials = materials.filter((m) => {
    const q = materialQuery.trim().toLowerCase();

    if (!q) return true;

    return (
      m.nombre.toLowerCase().includes(q) ||
      (m.tipo || "").toLowerCase().includes(q) ||
      String(m.cantidad).includes(q) ||
      String(m.precio).includes(q)
    );
  });

  const totalCosto = filteredMaterials.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  const handleDeleteMaterial = (id) => {
    setMaterials((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveMaterial = (e) => {
    e.preventDefault();

    if (
      !newMaterial.nombre.trim() ||
      !newMaterial.serie.trim() ||
      !newMaterial.ubicacion.trim() ||
      !newMaterial.fechaAdquisicion ||
      !newMaterial.estado.trim()
    ) {
      alert("Completa los campos del material.");
      return;
    }

    const materialToAdd = {
      id: Date.now(),
      nombre: newMaterial.nombre.trim(),
      serie: newMaterial.serie.trim(),
      ubicacion: newMaterial.ubicacion.trim(),
      fechaAdquisicion: newMaterial.fechaAdquisicion,
      cantidad: Number(newMaterial.cantidad) || 1,
      estado: newMaterial.estado,
      descripcion: newMaterial.descripcion.trim(),
      tipo: newMaterial.ubicacion.trim(),
      precio: Number(newMaterial.precio) || 100,
    };

    setMaterials((prev) => [...prev, materialToAdd]);
    resetMaterialForm();
    setShowAddMaterialModal(false);
  };

  return (
    <>
      <div
        className="modal fade project-modal"
        id="createProjectModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 rounded-4">
            <div className="modal-body p-4 p-md-5">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h2 className="modal-title-custom m-0">
                  <i className="bi bi-folder-fill me-3"></i>
                  Agregar Proyecto
                </h2>

                <button
                  id="btnCloseCreateProjectModal"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="border rounded-4 p-4 mb-4">
                  <h4 className="mb-4 fw-bold" style={{ color: "#1d3f57" }}>
                    Datos del Proyecto
                  </h4>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Nombre del proyecto:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Equipo:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Presupuesto:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ingrese el presupuesto"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Fecha inicio:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Fecha fin:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">
                      Descripción:
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Ingrese una descripción para el proyecto"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowMaterialsModal(true)}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Agregar material
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      type="button"
                      onClick={resetForm}
                    >
                      Cancelar
                    </button>

                    <button className="btn btn-success" type="submit">
                      Agregar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showMaterialsModal && (
        <div className="custom-materials-overlay">
          <div className="custom-materials-modal">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="modal-title-custom m-0">
                Materiales del Proyecto
              </h2>

              <button
                type="button"
                className="btn-close"
                onClick={() => setShowMaterialsModal(false)}
              ></button>
            </div>

            <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
              <div className="input-group" style={{ maxWidth: 650 }}>
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Buscar materiales..."
                  value={materialQuery}
                  onChange={(e) => setMaterialQuery(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-success"
                onClick={() => setShowAddMaterialModal(true)}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Agregar otro material
              </button>
            </div>

            <div className="table-responsive mb-3">
              <table className="table align-middle">
                <thead className="teams-table-head">
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMaterials.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No hay materiales.
                      </td>
                    </tr>
                  ) : (
                    filteredMaterials.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.tipo}</td>
                        <td>{item.cantidad}</td>
                        <td>${item.precio} MXN</td>
                        <td className="fw-bold">
                          ${item.cantidad * item.precio} MXN
                        </td>
                        <td className="text-center">
                          <button className="action-btn" type="button">
                            <i className="bi bi-pencil-fill action-icon"></i>
                          </button>

                          <button
                            className="action-btn"
                            type="button"
                            onClick={() => handleDeleteMaterial(item.id)}
                          >
                            <i className="bi bi-trash-fill action-icon"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <span className="fw-semibold">
                Total de materiales: {filteredMaterials.length}
              </span>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowMaterialsModal(false)}
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setShowMaterialsModal(false)}
                >
                  Guardar cambios
                </button>
              </div>

              <span className="fw-semibold">Costo total: ${totalCosto} MXN</span>
            </div>
          </div>
        </div>
      )}

      {showAddMaterialModal && (
        <div className="custom-materials-overlay" style={{ zIndex: 4000 }}>
          <div className="custom-add-material-modal">
            <div className="mb-4">
              <h2 className="modal-title-custom text-center m-0">
                <i className="bi bi-layers-fill me-3"></i>
                Agregar material
              </h2>
            </div>

            <form onSubmit={handleSaveMaterial}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Nombre del material
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del proyecto"
                    value={newMaterial.nombre}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, nombre: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">No. de Serie</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número de serie"
                    value={newMaterial.serie}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, serie: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Ubicación</label>
                  <select
                    className="form-select"
                    value={newMaterial.ubicacion}
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        ubicacion: e.target.value,
                      })
                    }
                  >
                    <option value="">Ubicación</option>
                    <option value="Bodega A">Bodega A</option>
                    <option value="Bodega B">Bodega B</option>
                    <option value="Patio">Patio</option>
                    <option value="Almacén">Almacén</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Fecha de adquisición
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={newMaterial.fechaAdquisicion}
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        fechaAdquisicion: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={newMaterial.cantidad}
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        cantidad: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Estado</label>
                  <select
                    className="form-select"
                    value={newMaterial.estado}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, estado: e.target.value })
                    }
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="En uso">En uso</option>
                    <option value="Agotado">Agotado</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Descripción"
                    value={newMaterial.descripcion}
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        descripcion: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={() => {
                    resetMaterialForm();
                    setShowAddMaterialModal(false);
                  }}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn btn-success px-4">
                  Guardar Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}