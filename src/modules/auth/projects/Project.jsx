import { useMemo, useState } from "react";
import CreateProjectModal from "./components/CreateProject";
import ProjectRow from "./components/ProjectRow";

export default function Projects() {
  const [query, setQuery] = useState("");

  const [projects, setProjects] = useState([
    { name: "Sistema de inventario", team: "Proyecto Alpha", budget: 20000 },
    { name: "Sistema de registros", team: "Proyecto Beta", budget: 75000 },
    { name: "Control de proyectos", team: "Proyecto Gamma", budget: 50000 },
  ]);

  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        String(p.budget).includes(q)
      );
    });
  }, [query, projects]);

  return (
    <div>
      <h2>Proyectos</h2>

      <section className="mt-4 d-flex align-items-center">
        <div className="input-group me-auto" style={{ width: 500 }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>

          <input
            type="search"
            className="form-control"
            placeholder="Buscar proyectos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#createProjectModal"
          type="button"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Agregar proyecto
        </button>
      </section>

      <section className="mt-4">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Proyecto</th>
                <th scope="col">Equipo</th>
                <th scope="col">Presupuesto</th>
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No hay resultados.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p, index) => (
                  <ProjectRow key={index} project={p} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}
      <CreateProjectModal onAddProject={handleAddProject} />
    </div>
  );
}