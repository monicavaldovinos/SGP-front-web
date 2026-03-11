export default function TeamRow({ team, index }) {
  if (!team) return null;

  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{team.name}</td>
      <td>{team.leader}</td>
      <td>{team.members}</td>

      <td className="text-center">
        {/* EDITAR */}
        <button className="btn btn-sm btn-primary me-2" type="button">
          <i className="bi bi-pencil"></i>
        </button>

        {/* ELIMINAR */}
        <button className="btn btn-sm btn-danger me-2" type="button">
          <i className="bi bi-trash"></i>
        </button>

        {/* VER */}
        <button className="btn btn-sm btn-secondary" type="button">
          <i className="bi bi-eye"></i>
        </button>
      </td>
    </tr>
  );
}