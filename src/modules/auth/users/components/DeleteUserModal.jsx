import { deleteUser } from "../../../../api/userService";
import { useState } from "react";

export default function DeleteUserModal({
  modalId = "deleteUserModal",
  user = null,
  onDeleted = () => {},
}) {
  const [submitting, setSubmitting] = useState(false);

  const closeModal = () => {
    const closeBtn = document.getElementById(`btnClose-${modalId}`);
    if (closeBtn) closeBtn.click();
  };

  const handleDelete = async () => {
    if (!user?.id) return;

    try {
      setSubmitting(true);
      await deleteUser(user.id);
      closeModal();
      await onDeleted();
      alert("Usuario eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert(error?.response?.data?.message || "No se pudo eliminar el usuario.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow">
          <div className="modal-body p-4 text-center">
            <h2 className="fw-bold mb-4">
              <i className="bi bi-layers-fill me-2"></i>
              Eliminar integrante
            </h2>

            <p className="fs-4 mb-4">
              ¿Estas seguro de que deseas eliminar a{" "}
              <strong>{user?.name || "este usuario"}</strong>?
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-danger px-4"
                onClick={handleDelete}
                disabled={submitting}
              >
                {submitting ? "Eliminando..." : "Eliminar"}
              </button>

              <button
                id={`btnClose-${modalId}`}
                className="btn btn-success px-4"
                type="button"
                data-bs-dismiss="modal"
                disabled={submitting}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}