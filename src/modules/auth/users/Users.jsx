import { useEffect, useMemo, useState } from "react";
import UsersTabs from "./components/UsersTabs";
import LeadersTable from "./components/LeadersTable";
import MembersTable from "./components/MembersTable";
import CreateMemberModal from "./components/CreateMember";
import EditUserModal from "./components/EditUserModal";
import ViewUserModal from "./components/ViewUserModal";
import DeleteUserModal from "./components/DeleteUserModal";
import { getUsers } from "../../../api/userService";
import { getTeams, getTeamMembers } from "../../../api/teamService";

export default function Users() {
  const [activeTab, setActiveTab] = useState("leaders");
  const [query, setQuery] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const getNombreCompleto = (persona) => {
    if (!persona) return "";
    return [persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno]
      .filter(Boolean)
      .join(" ")
      .trim();
  };

  const getRoleName = (rol) => {
    if (!rol) return "Sin rol";
    if (typeof rol === "string") return rol;
    return rol.nombre || rol.nombreRol || "Sin rol";
  };

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

  const handleGetUsers = async () => {
    try {
      setLoading(true);

      const [usersResponse, teamsResponse] = await Promise.all([
        getUsers(),
        getTeams(),
      ]);

      console.log("Respuesta usuarios:", usersResponse);
      console.log("Respuesta equipos:", teamsResponse);

      const rawUsers = Array.isArray(usersResponse)
        ? usersResponse
        : Array.isArray(usersResponse?.data)
        ? usersResponse.data
        : [];

      const rawTeams = Array.isArray(teamsResponse)
        ? teamsResponse
        : Array.isArray(teamsResponse?.data)
        ? teamsResponse.data
        : [];

      const teamMapByUserId = new Map();

      await Promise.all(
        rawTeams.map(async (team) => {
          try {
            const teamId = team.idEquipo || team.id;
            const teamName = team.nombreEquipo || team.nombre || "Sin equipo";

            const possibleLeader =
              team.lider || team.usuarioLider || team.encargado || null;

            if (possibleLeader?.idUsuario || possibleLeader?.id) {
              teamMapByUserId.set(
                String(possibleLeader.idUsuario || possibleLeader.id),
                teamName
              );
            }

            const membersResponse = await getTeamMembers(teamId);
            const members = Array.isArray(membersResponse)
              ? membersResponse
              : Array.isArray(membersResponse?.data)
              ? membersResponse.data
              : [];

            const normalizedMembers = normalizeMembers(members);

            normalizedMembers.forEach((member) => {
              if (member?.id) {
                teamMapByUserId.set(String(member.id), teamName);
              }
            });
          } catch (error) {
            console.error("Error obteniendo integrantes del equipo:", error);
          }
        })
      );

      const formattedUsers = rawUsers.map((user) => {
        const fullName = [
          user.nombre,
          user.apellidoPaterno,
          user.apellidoMaterno,
        ]
          .filter(Boolean)
          .join(" ");

        const userId = String(user.idUsuario || user.id || "");
        const roleName = getRoleName(user.rol);

        return {
          id: user.idUsuario,
          name: fullName || "Sin nombre",
          firstName: user.nombre || "",
          lastNameP: user.apellidoPaterno || "",
          lastNameM: user.apellidoMaterno || "",
          username: user.username || "Sin usuario",
          email: user.correo || "",
          salary: user.salario ?? "",
          entryDate: user.fechaRegistro || "",
          role: roleName,
          status: user.estatus || "Sin estatus",
          team:
            teamMapByUserId.get(userId) ||
            user.equipo?.nombreEquipo ||
            user.equipo?.nombre ||
            user.nombreEquipo ||
            "Sin equipo",
        };
      });

      const activeUsers = formattedUsers.filter(
        (user) => (user.status || "").toUpperCase() !== "INACTIVO"
      );

      const leadersList = activeUsers.filter((user) =>
        (user.role || "").toLowerCase().includes("lider")
      );

      const membersList = activeUsers.filter(
        (user) => !(user.role || "").toLowerCase().includes("lider")
      );

      setLeaders(leadersList);
      setMembers(membersList);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setLeaders([]);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
  };

  const filteredLeaders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leaders;

    return leaders.filter((u) => {
      const name = (u.name ?? "").toLowerCase();
      const username = (u.username ?? "").toLowerCase();
      const team = (u.team ?? "").toLowerCase();
      const role = (u.role ?? "").toLowerCase();

      return (
        name.includes(q) ||
        username.includes(q) ||
        team.includes(q) ||
        role.includes(q)
      );
    });
  }, [query, leaders]);

  const filteredMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;

    return members.filter((u) => {
      const name = (u.name ?? "").toLowerCase();
      const username = (u.username ?? "").toLowerCase();
      const team = (u.team ?? "").toLowerCase();
      const role = (u.role ?? "").toLowerCase();

      return (
        name.includes(q) ||
        username.includes(q) ||
        team.includes(q) ||
        role.includes(q)
      );
    });
  }, [query, members]);

  const isLeaders = activeTab === "leaders";

  return (
    <div>
      <h2>
        <i className="bi bi-person-fill"></i>&nbsp;Usuarios
      </h2>

      <section className="mt-4 d-flex align-items-center gap-3">
        <UsersTabs activeTab={activeTab} onChange={setActiveTab} />

        {!isLeaders && (
          <div className="ms-auto">
            <button
              className="btn btn-success"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#createMemberModal"
            >
              <i className="bi bi-plus-lg me-2"></i>
              Crear Usuario
            </button>
          </div>
        )}
      </section>

      <section className="mt-3 d-flex align-items-center">
        <div className="input-group" style={{ width: 500 }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>

          <input
            type="search"
            className="form-control"
            placeholder={
              isLeaders ? "Buscar líderes..." : "Buscar integrantes..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="mt-4">
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : isLeaders ? (
          <LeadersTable
            data={filteredLeaders}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        ) : (
          <MembersTable
            data={filteredMembers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </section>

      <CreateMemberModal onSaved={handleGetUsers} />

      <EditUserModal
        modalId="editUserModal"
        user={selectedUser}
        onSaved={handleGetUsers}
        showRole={isLeaders}
      />

      <ViewUserModal
        modalId="viewUserModal"
        user={selectedUser}
        showRole={isLeaders}
      />

      <DeleteUserModal
        modalId="deleteUserModal"
        user={selectedUser}
        onDeleted={handleGetUsers}
      />
    </div>
  );
}