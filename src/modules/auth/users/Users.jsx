import { useMemo, useState } from "react";
import UsersTabs from "./components/UsersTabs";
import LeadersTable from "./components/LeadersTable";
import MembersTable from "./components/MembersTable";
import CreateLeaderModal from "./components/CreateLeader";
import CreateMemberModal from "./components/CreateMember";

export default function Users() {
  const [activeTab, setActiveTab] = useState("leaders"); // 'leaders' | 'members'
  const [query, setQuery] = useState("");

  // Mock data (luego lo conectas a BD)
  const [leaders, setLeaders] = useState([
    { id: crypto.randomUUID(), name: "Carlos Perez", username: "Carlto123", team: "Alpha" },
    { id: crypto.randomUUID(), name: "Juan Perez", username: "Juan098", team: "Beta" },
    { id: crypto.randomUUID(), name: "Erick Perez", username: "Erip87", team: "Gamma" },
  ]);

  const [members, setMembers] = useState([
    { id: crypto.randomUUID(), name: "Sandra Perez", username: "Sandra345", team: "Delta", role: "Tester" },
    { id: crypto.randomUUID(), name: "Gael Perez", username: "Perez280", team: "Zeta", role: "Dev" },
    { id: crypto.randomUUID(), name: "Maria Perez", username: "Mari4567", team: "Theta", role: "Doc" },
  ]);

  const handleAddLeader = (newLeader) => {
    const fixed = { id: newLeader.id ?? crypto.randomUUID(), ...newLeader };
    setLeaders((prev) => [fixed, ...prev]);
  };

  const handleAddMember = (newMember) => {
    const fixed = { id: newMember.id ?? crypto.randomUUID(), ...newMember };
    setMembers((prev) => [fixed, ...prev]);
  };

  // Filtrado según pestaña activa
  const filteredLeaders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leaders;

    return leaders.filter((u) => {
      const name = (u.name ?? "").toLowerCase();
      const username = (u.username ?? "").toLowerCase();
      const team = (u.team ?? "").toLowerCase();
      return name.includes(q) || username.includes(q) || team.includes(q);
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
      return name.includes(q) || username.includes(q) || team.includes(q) || role.includes(q);
    });
  }, [query, members]);

  const isLeaders = activeTab === "leaders";

  return (
    <div>
      <h2>Usuarios</h2>

      {/* Tabs + botón */}
      <section className="mt-4 d-flex align-items-center gap-3">
        <UsersTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="ms-auto">
          <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target={isLeaders ? "#createLeaderModal" : "#createMemberModal"} >
            <i className="bi bi-plus-lg me-2"></i>
            {isLeaders ? "Agregar líder" : "Agregar integrante"}
          </button>
        </div>
      </section>

      {/* Buscador */}
      <section className="mt-3 d-flex align-items-center">
        <div className="input-group" style={{ width: 500 }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>

          <input type="search" className="form-control" placeholder={isLeaders ? "Buscar líderes..." : "Buscar integrantes..."} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </section>

      {/* Tabla según pestaña */}
      <section className="mt-4">
        {isLeaders ? (
          <LeadersTable data={filteredLeaders} />
        ) : (
          <MembersTable data={filteredMembers} />
        )}
      </section>

      {/* Modales */}
      <CreateLeaderModal onAddLeader={handleAddLeader} />
      <CreateMemberModal onAddMember={handleAddMember} />
    </div>
  );
}