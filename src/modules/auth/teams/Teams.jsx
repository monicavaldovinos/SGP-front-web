import { useEffect, useMemo, useState } from "react";
import {
  getTeams,
  getTeamById,
  getTeamMembers,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../../api/teamService";
import { getAvailableUsersForTeam } from "../../../api/userService";
import { getProjects } from "../../../api/projectService";

import TeamRow from "./components/TeamRow";
import CreateTeam from "./components/CreateTeam";
import ViewTeam from "./components/ViewTeam";
import EditTeam from "./components/EditTeam";
import DeleteTeam from "./components/DeleteTeam";
import SuccessModal from "./components/SuccessModal";

export default function Teams() {
  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showCreatedSuccess, setShowCreatedSuccess] = useState(false);
  const [showEditedSuccess, setShowEditedSuccess] = useState(false);
  const [showDeletedSuccess, setShowDeletedSuccess] = useState(false);

  const getNombreCompleto = (persona) => {
    if (!persona) return "";
    return [persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno]
      .filter(Boolean)
      .join(" ")
      .trim();
  };

  const normalizeUser = (u) => ({
    id: String(u.idUsuario || u.id || ""),
    nombre:
      getNombreCompleto(u) ||
      u.nombreCompleto ||
      u.nombre ||
      "Sin nombre",
    correo: u.correo || u.email || "Sin correo",
    username: u.username || u.usuario || "Sin usuario",
    rol:
      u.rol?.nombre ||
      u.rol?.nombreRol ||
      u.nombreRol ||
      u.rol ||
      "",
  });

  const normalizeMembers = (list = []) =>
    list.map((m, index) => ({
      id: String(m.idUsuario || m.id || index + 1),
      nombre:
        getNombreCompleto(m) ||
        m.nombreCompleto ||
        m.nombre ||
        "Sin nombre",
      correo: m.correo || m.email || "Sin correo",
      username: m.username || m.usuario || "Sin usuario",
      rol:
        m.rol?.nombre ||
        m.rol?.nombreRol ||
        m.nombreRol ||
        m.rol ||
        "",
    }));

  const buildFallbackTeam = (team) => ({
    id: String(team.idEquipo || team.id || ""),
    nombre: team.nombreEquipo || team.nombre || "Sin nombre",
    lider: "Sin líder",
    liderId: "",
    proyecto: team.proyecto?.nombreProyecto || team.proyecto?.nombre || "",
    proyectoId: team.proyecto?.idProyecto
      ? String(team.proyecto.idProyecto)
      : team.proyecto?.id
      ? String(team.proyecto.id)
      : "",
    miembros: 0,
    miembrosIds: [],
    membersDetail: [],
    correoLider: "Sin correo",
    logo: team.logo || "",
    presupuesto: team.presupuesto ?? 100000,
    progreso: team.progreso ?? 45,
    original: team,
  });

  const normalizeTeam = (team, integrantes = []) => {
    const membersDetail = normalizeMembers(integrantes);

    const possibleLeader =
      team.lider ||
      team.usuarioLider ||
      team.encargado ||
      null;

    let leaderData = null;

    if (possibleLeader) {
      leaderData = {
        id: String(possibleLeader.idUsuario || possibleLeader.id || ""),
        nombre:
          getNombreCompleto(possibleLeader) ||
          possibleLeader.nombreCompleto ||
          possibleLeader.nombre ||
          "Sin líder",
        correo: possibleLeader.correo || possibleLeader.email || "Sin correo",
        username:
          possibleLeader.username || possibleLeader.usuario || "Sin usuario",
        rol:
          possibleLeader.rol?.nombre ||
          possibleLeader.rol?.nombreRol ||
          possibleLeader.nombreRol ||
          possibleLeader.rol ||
          "",
      };
    }

    if (!leaderData && membersDetail.length > 0) {
      const byRole = membersDetail.find((m) =>
        (m.rol || "").toLowerCase().includes("lider")
      );
      if (byRole) {
        leaderData = byRole;
      }
    }

    const leaderId = leaderData?.id ? String(leaderData.id) : "";

    const membersWithoutLeader = membersDetail.filter(
      (m) => String(m.id) !== leaderId
    );

    return {
      id: String(team.idEquipo || team.id || ""),
      nombre: team.nombreEquipo || team.nombre || "Sin nombre",
      lider: leaderData?.nombre || "Sin líder",
      liderId: leaderId,
      proyecto: team.proyecto?.nombreProyecto || team.proyecto?.nombre || "",
      proyectoId: team.proyecto?.idProyecto
        ? String(team.proyecto.idProyecto)
        : team.proyecto?.id
        ? String(team.proyecto.id)
        : "",
      miembros: membersWithoutLeader.length,
      miembrosIds: membersWithoutLeader.map((m) => String(m.id)),
      membersDetail: membersWithoutLeader,
      leaderDetail: leaderData,
      correoLider: leaderData?.correo || "Sin correo",
      logo: team.logo || "",
      presupuesto: team.presupuesto ?? 100000,
      progreso: team.progreso ?? 45,
      original: team,
    };
  };

  const handleGetTeams = async () => {
    try {
      setLoading(true);

      const response = await getTeams();
      const teamList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      const enrichedTeams = await Promise.all(
        teamList.map(async (team) => {
          try {
            const teamId = team.idEquipo || team.id;
            const membersResponse = await getTeamMembers(teamId);
            const members = Array.isArray(membersResponse)
              ? membersResponse
              : Array.isArray(membersResponse?.data)
              ? membersResponse.data
              : [];

            return normalizeTeam(team, members);
          } catch (error) {
            console.error("Error obteniendo integrantes del equipo:", error);
            return buildFallbackTeam(team);
          }
        })
      );

      setTeams(enrichedTeams);
    } catch (error) {
      console.error("Error al obtener equipos:", error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAvailableUsers = async () => {
    try {
      const response = await getAvailableUsersForTeam();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setUsuariosDisponibles(list.map(normalizeUser));
    } catch (error) {
      console.error("Error cargando usuarios disponibles para equipo:", error);
      setUsuariosDisponibles([]);
    }
  };

  const handleGetProjects = async () => {
    try {
      const response = await getProjects();
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      const formatted = list.map((p) => ({
        id: String(p.idProyecto || p.id || ""),
        nombre: p.nombreProyecto || p.nombre || "Sin nombre",
      }));

      setProyectos(formatted);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
      setProyectos([]);
    }
  };

  useEffect(() => {
    handleGetTeams();
    handleGetProjects();
    handleGetAvailableUsers();
  }, []);

  const filteredTeams = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;

    return teams.filter((t) => {
      const nombre = (t.nombre || "").toLowerCase();
      const lider = (t.lider || "").toLowerCase();
      const proyecto = (t.proyecto || "").toLowerCase();

      return (
        nombre.includes(q) ||
        lider.includes(q) ||
        proyecto.includes(q)
      );
    });
  }, [query, teams]);

  const handleView = async (team) => {
    try {
      const teamResponse = await getTeamById(team.id);
      const teamData = teamResponse?.data || teamResponse;

      const membersResponse = await getTeamMembers(team.id);
      const integrantes = Array.isArray(membersResponse)
        ? membersResponse
        : Array.isArray(membersResponse?.data)
        ? membersResponse.data
        : [];

      setSelectedTeam(normalizeTeam(teamData, integrantes));
      setShowViewModal(true);
    } catch (error) {
      console.error("Error al obtener detalle del equipo:", error);
    }
  };

  const handleEdit = async (team) => {
    try {
      const teamResponse = await getTeamById(team.id);
      const teamData = teamResponse?.data || teamResponse;

      const membersResponse = await getTeamMembers(team.id);
      const integrantes = Array.isArray(membersResponse)
        ? membersResponse
        : Array.isArray(membersResponse?.data)
        ? membersResponse.data
        : [];

      setSelectedTeam(normalizeTeam(teamData, integrantes));
      setShowEditModal(true);
    } catch (error) {
      console.error("Error al obtener detalle para editar:", error);
    }
  };

  const handleDeleteOpen = (team) => {
    setSelectedTeam(team);
    setShowDeleteModal(true);
  };

  const handleCreateTeam = async (formData) => {
    try {
      setSubmitting(true);

      const payload = {
        nombreEquipo: formData.nombre,
        logo: formData.logo || "",
        lider: formData.liderId
          ? { idUsuario: Number(formData.liderId) }
          : null,
        proyecto: formData.proyectoId
          ? { idProyecto: Number(formData.proyectoId) }
          : null,
        miembros: (formData.miembrosIds || []).map((id) => ({
          idUsuario: Number(id),
        })),
      };

      console.log("PAYLOAD CREAR EQUIPO:", payload);

      await createTeam(payload);
      setShowCreateModal(false);
      await Promise.all([handleGetTeams(), handleGetAvailableUsers()]);
      setShowCreatedSuccess(true);
    } catch (error) {
      console.error("Error al crear equipo:", error);
      alert(error?.response?.data?.message || "No se pudo crear el equipo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveEdit = async (formData) => {
    try {
      if (!selectedTeam?.id) return;

      setSubmitting(true);

      const payload = {
        idEquipo: Number(selectedTeam.id),
        nombreEquipo: formData.nombre,
        logo: formData.logo || "",
        lider: formData.liderId
          ? { idUsuario: Number(formData.liderId) }
          : null,
        proyecto: formData.proyectoId
          ? { idProyecto: Number(formData.proyectoId) }
          : null,
        miembros: (formData.miembrosIds || []).map((id) => ({
          idUsuario: Number(id),
        })),
      };

      await updateTeam(selectedTeam.id, payload);
      setShowEditModal(false);
      await Promise.all([handleGetTeams(), handleGetAvailableUsers()]);
      setShowEditedSuccess(true);
    } catch (error) {
      console.error("Error al editar equipo:", error);
      alert(error?.response?.data?.message || "No se pudo actualizar el equipo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedTeam?.id) return;

      setSubmitting(true);

      await deleteTeam(selectedTeam.id);
      setShowDeleteModal(false);
      await Promise.all([handleGetTeams(), handleGetAvailableUsers()]);
      setShowDeletedSuccess(true);
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      alert(error?.response?.data?.message || "No se pudo eliminar el equipo.");
    } finally {
      setSubmitting(false);
    }
  };

  const usuariosDisponiblesParaCrear = useMemo(() => {
    return [...usuariosDisponibles].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  }, [usuariosDisponibles]);

  const usuariosDisponiblesParaEditar = useMemo(() => {
    if (!selectedTeam) return usuariosDisponiblesParaCrear;

    const actuales = [];

    if (selectedTeam.leaderDetail?.id) {
      actuales.push({
        id: String(selectedTeam.leaderDetail.id),
        nombre: selectedTeam.leaderDetail.nombre,
        correo: selectedTeam.leaderDetail.correo || "",
        username: selectedTeam.leaderDetail.username || "",
        rol: selectedTeam.leaderDetail.rol || "",
      });
    }

    selectedTeam.membersDetail.forEach((m) => {
      actuales.push({
        id: String(m.id),
        nombre: m.nombre,
        correo: m.correo || "",
        username: m.username || "",
        rol: m.rol || "",
      });
    });

    const map = new Map();

    [...actuales, ...usuariosDisponibles].forEach((u) => {
      if (u?.id) {
        map.set(String(u.id), {
          id: String(u.id),
          nombre: u.nombre || "Sin nombre",
          correo: u.correo || "",
          username: u.username || "",
          rol: u.rol || "",
        });
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  }, [selectedTeam, usuariosDisponibles, usuariosDisponiblesParaCrear]);

  const proyectosOcupadosIds = useMemo(() => {
    return teams
      .map((t) => String(t.proyectoId || ""))
      .filter(Boolean);
  }, [teams]);

  const proyectosDisponibles = useMemo(() => {
    return proyectos.filter(
      (p) => !proyectosOcupadosIds.includes(String(p.id))
    );
  }, [proyectos, proyectosOcupadosIds]);

  const proyectosDisponiblesParaEditar = useMemo(() => {
    if (!selectedTeam) return proyectosDisponibles;

    const map = new Map();

    if (selectedTeam.proyectoId) {
      const proyectoActual = proyectos.find(
        (p) => String(p.id) === String(selectedTeam.proyectoId)
      );
      if (proyectoActual) {
        map.set(String(proyectoActual.id), proyectoActual);
      }
    }

    proyectosDisponibles.forEach((p) => {
      map.set(String(p.id), p);
    });

    return Array.from(map.values());
  }, [selectedTeam, proyectos, proyectosDisponibles]);

  return (
    <div>
      <h2>
        <i className="bi bi-people-fill me-2"></i>
        Equipos
      </h2>

      <section className="mt-4 d-flex align-items-center">
        <div className="input-group me-auto" style={{ width: 500 }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>

          <input
            type="search"
            className="form-control"
            placeholder="Buscar equipos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success"
          type="button"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Crear equipo
        </button>
      </section>

      <section className="mt-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="teams-table-head">
              <tr>
                <th>Equipos</th>
                <th>Líder</th>
                <th>Miembros</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Cargando equipos...
                  </td>
                </tr>
              ) : filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No hay resultados.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team, index) => (
                  <TeamRow
                    key={team.id || index}
                    team={team}
                    onEdit={handleEdit}
                    onDelete={handleDeleteOpen}
                    onView={handleView}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showCreateModal && (
        <CreateTeam
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTeam}
          submitting={submitting}
          proyectos={proyectosDisponibles}
          miembrosDisponibles={usuariosDisponiblesParaCrear}
        />
      )}

      {showViewModal && selectedTeam && (
        <ViewTeam
          team={selectedTeam}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showEditModal && selectedTeam && (
        <EditTeam
          team={selectedTeam}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
          submitting={submitting}
          proyectos={proyectosDisponiblesParaEditar}
          miembrosDisponibles={usuariosDisponiblesParaEditar}
        />
      )}

      {showDeleteModal && selectedTeam && (
        <DeleteTeam
          team={selectedTeam}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleConfirmDelete}
          submitting={submitting}
        />
      )}

      {showCreatedSuccess && (
        <SuccessModal
          title="Creado exitosamente"
          message="Los cambios se han guardado correctamente en el sistema"
          onClose={() => setShowCreatedSuccess(false)}
        />
      )}

      {showEditedSuccess && (
        <SuccessModal
          title="Guardado exitosamente"
          message="Los cambios se han guardado correctamente en el sistema"
          onClose={() => setShowEditedSuccess(false)}
        />
      )}

      {showDeletedSuccess && (
        <SuccessModal
          title="Eliminado exitosamente"
          message="El registro ha sido eliminado correctamente del sistema"
          onClose={() => setShowDeletedSuccess(false)}
        />
      )}
    </div>
  );
}