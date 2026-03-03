export default function CreateProjectModal(){
    return(

    <div className="modal fade" id="createProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">
            <div className="modal-body">
                <h4>Registrar producto</h4>
                <hr />
                <form action= "" className="row">
                    <div className="col-12">
                        <label htmlFor=""><small>Nombre del proyecto</small></label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-8">
                        <label htmlFor=""><small>Marca</small></label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-4">
                        <label htmlFor=""><small>C. unitario</small></label>
                        <input type="text" className="form-control" />
                    </div>
                </form>

                <div className="text-end mt-3">
                    <button className="btn btn-secondary me-2" vdata-bs-dismiss="modal">
                        <i className="bi bi-ban"></i>
                        &nbsp;Cancelar
                    </button>
                    <button className="btn btn-success">
                        <i className="bi bi-save"></i>
                        &nbsp;Guardar
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}