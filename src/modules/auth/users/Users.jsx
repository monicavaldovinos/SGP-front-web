import { useEffect, useMemo, useState } from "react";
import UsersTabs from "./components/UsersTabs";
import LeadersTable from "./components/LeadersTable";
import MembersTable from "./components/MembersTable";
import CreateLeaderModal from "./components/CreateLeader";
import CreateMemberModal from "./components/CreateMember";
import { getUsers } from "../../../api/userService";

export default function Users() {
  const [activeTab, setActiveTab] = useState("leaders");
  const [query, setQuery] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

 const handleGetUsers = async () => {
  try {
    setLoading(true);

    const response = await getUsers();
    console.log("Respuesta usuarios:", response);

    const userList = response.data || response || [];

    const formattedUsers = userList.map((user) => {
      const fullName = [
        user.nombre,
        user.apellidoPaterno,
        user.apellidoMaterno,
      ]
        .filter(Boolean)
        .join(" ");

      return {
        id: user.idUsuario,
        name: fullName || "Sin nombre",
        username: user.username || "Sin usuario",
        team: "Sin equipo",
        role: user.rol?.nombre || user.rol?.nombreRol || "Sin rol",
        status: user.estatus || "Sin estatus",
        email: user.correo || "",
      };
    });

    const leadersList = formattedUsers.filter((user) =>
      user.role.toLowerCase().includes("lider")
    );

    const membersList = formattedUsers.filter(
      (user) => !user.role.toLowerCase().includes("lider")
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

  const handleAddLeader = (newLeader) => {
    const fixed = { id: newLeader.id ?? crypto.randomUUID(), ...newLeader };
    setLeaders((prev) => [fixed, ...prev]);
  };

  const handleAddMember = (newMember) => {
    const fixed = { id: newMember.id ?? crypto.randomUUID(), ...newMember };
    setMembers((prev) => [fixed, ...prev]);
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

        <div className="ms-auto">
          <button
            className="btn btn-success"
            type="button"
            data-bs-toggle="modal"
            data-bs-target={isLeaders ? "#createLeaderModal" : "#createMemberModal"}
          >
            <i className="bi bi-plus-lg me-2"></i>
            {isLeaders ? "Agregar líder" : "Agregar integrante"}
          </button>
        </div>
      </section>

      <section className="mt-3 d-flex align-items-center">
        <div className="input-group" style={{ width: 500 }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>

          <input
            type="search"
            className="form-control"
            placeholder={isLeaders ? "Buscar líderes..." : "Buscar integrantes..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="mt-4">
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : isLeaders ? (
          <LeadersTable data={filteredLeaders} />
        ) : (
          <MembersTable data={filteredMembers} />
        )}
      </section>

      <CreateLeaderModal onAddLeader={handleAddLeader} />
      <CreateMemberModal onAddMember={handleAddMember} />
    </div>
  );
}