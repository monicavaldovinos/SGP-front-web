import { useEffect, useMemo, useState } from "react";
import "../../../styles/projects.css";
import CreateProjectModal from "./components/CreateProject";
import EditProjectModal from "./components/EditProject";
import ViewProjectModal from "./components/ViewProject";
import DeleteProjectModal from "./components/DeleteProject";
import MaterialsProjectModal from "./components/MaterialsProjectModal";
import ProjectRow from "./components/ProjectRow";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../../api/projectService";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleGetProjects = async () => {
  try {
    setLoading(true);

    const response = await getProjects();
    console.log("Respuesta proyectos:", response);

    const projectList = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
      ? response.data
      : [];

    const formattedProjects = projectList.map((project) => ({
      id: project.idProyecto,
      name: project.nombre || "Sin nombre",
      team: project.equipo?.nombre || "Sin equipo",
      budget: project.presupuestoTotal ?? 0,
      startDate: project.fechaInicio || "",
      endDate: project.fechaFin || "",
      description: project.descripcion || "",
      logo: project.logo || "",
      member: project.lider?.nombre || "",
      original: project,
    }));

    setProjects(formattedProjects);
  } catch (error) {
    console.log("Error al obtener proyectos:", error);
    setProjects([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    handleGetProjects();
  }, []);

  const handleAddProject = async (newProject) => {
    try {
      await createProject(newProject);
      await handleGetProjects();
      alert("Proyecto guardado correctamente");
    } catch (error) {
      console.log("Error al crear proyecto:", error);
      alert("No se pudo guardar el proyecto");
    }
  };

  const handleEditProject = async (id, updatedProject) => {
    try {
      await updateProject(id, updatedProject);
      await handleGetProjects();
      alert("Proyecto actualizado correctamente");
    } catch (error) {
      console.log("Error al editar proyecto:", error);
      alert("No se pudo actualizar el proyecto");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      await handleGetProjects();
      alert("Proyecto eliminado correctamente");
    } catch (error) {
      console.log("Error al eliminar proyecto:", error);
      alert("No se pudo eliminar el proyecto");
    }
  };

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;

    return projects.filter((p) => {
      return (
        p.name?.toLowerCase().includes(q) ||
        p.team?.toLowerCase().includes(q) ||
        String(p.budget ?? "").includes(q)
      );
    });
  }, [query, projects]);

  return (
    <div>
      <h2>
        <i className="bi bi-folder-fill"></i>&nbsp;Proyectos
      </h2>

      <section className="mt-4 d-flex align-items-center">
        <div className="input-group me-auto" style={{ width: 560 }}>
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
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#createProjectModal"
          type="button"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Crear proyecto
        </button>
      </section>

      <section className="mt-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="teams-table-head">
              <tr>
                <th>Proyecto</th>
                <th>Equipo</th>
                <th>Presupuesto</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Cargando proyectos...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No hay resultados.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p, index) => (
                  <ProjectRow
                    key={p.id || index}
                    project={p}
                    onEdit={() => setSelectedProject(p)}
                    onView={() => setSelectedProject(p)}
                    onDelete={() => setSelectedProject(p)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <CreateProjectModal onAddProject={handleAddProject} />
      <EditProjectModal
        project={selectedProject}
        onEditProject={handleEditProject}
      />
      <ViewProjectModal project={selectedProject} />
      <DeleteProjectModal
        project={selectedProject}
        onDeleteProject={handleDeleteProject}
      />
      <MaterialsProjectModal project={selectedProject} />
    </div>
  );
}