export default function ProjectRow({ project, onEdit, onView, onDelete }) {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.team}</td>
      <td>${project.budget}</td>

      <td className="text-center" style={{ width: 180 }}>
        <button
          className="action-btn"
          title="Editar"
          data-bs-toggle="modal"
          data-bs-target="#editProjectModal"
          onClick={onEdit}
        >
          <i className="bi bi-pencil-fill action-icon"></i>
        </button>

        <button
          className="action-btn"
          title="Eliminar"
          data-bs-toggle="modal"
          data-bs-target="#deleteProjectModal"
          onClick={onDelete}
        >
          <i className="bi bi-trash-fill action-icon"></i>
        </button>

        <button
          className="action-btn"
          title="Ver"
          data-bs-toggle="modal"
          data-bs-target="#viewProjectModal"
          onClick={onView}
        >
          <i className="bi bi-eye-fill action-icon"></i>
        </button>
      </td>
    </tr>
  );
}