export default function ProjectRow({ project, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{project.name}</td>
      <td>{project.team}</td>
      <td>${project.budget}</td>

      <td className="text-center" style={{ width: 180 }}>
        <button className="btn btn-primary btn-sm me-2" title="Editar">
          <i className="bi bi-pencil"></i>
        </button>

        <button className="btn btn-danger btn-sm me-2" title="Eliminar">
          <i className="bi bi-trash"></i>
        </button>

        <button className="btn btn-secondary btn-sm" title="Ver">
          <i className="bi bi-eye"></i>
        </button>
      </td>
    </tr>
  );
}