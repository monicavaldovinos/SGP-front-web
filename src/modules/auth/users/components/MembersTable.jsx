export default function MembersTable({ data = [] }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Equipo</th>
            <th scope="col" className="text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No hay resultados.
              </td>
            </tr>
          ) : (
            data.map((u, index) => (
              <tr key={u.id ?? index}>
                <th scope="row">{index + 1}</th>
                <td>{u.name ?? "-"}</td>
                <td>{u.username ?? "-"}</td>
                <td>{u.team ?? "-"}</td>

                <td className="text-center">
                  <button className="btn btn-sm btn-primary me-2" type="button">
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button className="btn btn-sm btn-danger me-2" type="button">
                    <i className="bi bi-trash"></i>
                  </button>

                  <button className="btn btn-sm btn-secondary" type="button">
                    <i className="bi bi-eye"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}