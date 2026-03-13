import { useState } from "react";

export default function MaterialsProjectModal({ project }) {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      nombre: "Cemento Portland",
      tipo: "CEMEX",
      cantidad: 50,
      precio: 150,
    },
    {
      id: 2,
      nombre: 'Varilla 3/8"',
      tipo: "Aceros SA",
      cantidad: 200,
      precio: 85,
    },
    {
      id: 3,
      nombre: "Arena",
      tipo: "Agregados del Sur",
      cantidad: 10,
      precio: 350,
    },
  ]);

  const [query, setQuery] = useState("");

  const filteredMaterials = materials.filter((m) => {
    const q = query.toLowerCase();
    return (
      m.nombre.toLowerCase().includes(q) ||
      m.tipo.toLowerCase().includes(q)
    );
  });

  const totalCosto = filteredMaterials.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  return (
    <div
      className="modal fade project-modal"
      id="materialsProjectModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content p-0 overflow-hidden">
          <div className="modal-header px-4 py-4 border-0">
            <h2 className="modal-title-custom m-0">
              Materiales del Proyecto {project?.team || "Alpha"}
            </h2>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body px-4">
            <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
              <div className="input-group" style={{ maxWidth: 640 }}>
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Buscar materiales..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <button type="button" className="btn btn-success">
                <i className="bi bi-plus-lg me-2"></i>
                Agregar otro material
              </button>
            </div>

            <div className="table-responsive">
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
                  {filteredMaterials.map((item) => (
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
                          data-bs-toggle="modal"
                          data-bs-target="#deleteMaterialModal"
                        >
                          <i className="bi bi-trash-fill action-icon"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between mt-3 fw-semibold">
              <span>Total de materiales: {filteredMaterials.length}</span>
              <span>Costo total: ${totalCosto} MXN</span>
            </div>
          </div>

          <div className="modal-footer border-0 px-4 pb-4">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-success">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}