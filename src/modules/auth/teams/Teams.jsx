import { useEffect, useMemo, useState } from "react";
import "../../../styles/projects.css";
import { getTeams } from "../../../api/teamService";

import TeamRow from "./components/TeamRow";
import CreateTeamModal from "./components/CreateTeam";

export default function Teams() {

  const [query, setQuery] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetTeams = async () => {
    try {

      setLoading(true);

      const response = await getTeams();

      const teamList = response.data || [];

      const formattedTeams = teamList.map((team) => ({
        id: team.idEquipo,
        nombre: team.nombreEquipo || "Sin nombre",
        lider: team.lider?.nombre || "Sin líder",
        miembros: team.miembros?.length ?? 0,
        original: team
      }));

      setTeams(formattedTeams);

    } catch (error) {

      console.log("Error al obtener equipos", error);
      setTeams([]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    handleGetTeams();
  }, []);

  const filteredTeams = useMemo(() => {

    const q = query.trim().toLowerCase();

    if (!q) return teams;

    return teams.filter((t) =>
      t.nombre.toLowerCase().includes(q) ||
      t.lider.toLowerCase().includes(q)
    );

  }, [query, teams]);

  const handleEdit = (team) => {
    console.log("Editar equipo:", team);
  };

  const handleDelete = (team) => {
    console.log("Eliminar equipo:", team);
  };

  const handleView = (team) => {
    console.log("Ver equipo:", team);
  };

  return (
    <div>

      <h2>
        <i className="bi bi-people-fill"></i> Equipos
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
          data-bs-toggle="modal"
          data-bs-target="#createTeamModal"
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
                    No hay resultados
                  </td>
                </tr>

              ) : (

                filteredTeams.map((team, index) => (

                  <TeamRow
                    key={team.id || index}
                    team={team}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                  />

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

      <CreateTeamModal onAddTeam={handleGetTeams} />

    </div>
  );
}