import { useMemo, useState } from "react";
import CreateTeamModal from "./components/CreateTeam";
import TeamRow from "./components/TeamRow";

export default function Teams() {
  const [query, setQuery] = useState("");

  const [teams, setTeams] = useState([
    { id: crypto.randomUUID(), name: "Alpha", leader: "Carlos Perez", members: 4 },
    { id: crypto.randomUUID(), name: "Beta", leader: "Juan Perez", members: 10 },
    { id: crypto.randomUUID(), name: "Gamma", leader: "Erick Perez", members: 7 },
  ]);

  const handleAddTeam = (newTeam) => {
    const teamWithId = {
      id: newTeam.id ?? crypto.randomUUID(),
      ...newTeam,
    };

    setTeams((prev) => [teamWithId, ...prev]);
  };

  const filteredTeams = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;

    return teams.filter((t) => {
      const name = (t.name ?? "").toLowerCase();
      const leader = (t.leader ?? "").toLowerCase();
      const members = String(t.members ?? "");

      return name.includes(q) || leader.includes(q) || members.includes(q);
    });
  }, [query, teams]);

  return (
    <div>
      <h2>Equipos</h2>

      <section className="mt-4 d-flex align-items-center">
        <div className="input-group me-auto" style={{ width: 500 }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input type="search" className="form-control" placeholder="Buscar equipos..." value={query} onChange={(e) => setQuery(e.target.value)}/>
        </div>

       <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createMemberModal" type="button">
            <i className="bi bi-plus-lg me-2"></i> Agregar miembro
        </button>
      </section>

      <section className="mt-4">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Equipo</th>
                <th scope="col">Líder</th>
                <th scope="col">Miembros</th>
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No hay resultados.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((t, index) => (
                  <TeamRow key={t.id} team={t} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL */}
      <CreateTeamModal onAddTeam={handleAddTeam} />
    </div>
  );
}