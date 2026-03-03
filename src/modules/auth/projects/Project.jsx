import CreateProjectModal from "./components/CreateProject";
import ProjectRow from "./components/ProjectRow";


export default function Projects(){
    return (
        <div>
            <h2>Productos</h2>
            <section className="mt-4 d-flex aling-items-center">
                <div className="input-group me-auto" style={{width: 500}}>
                    <span className="input-group-text"><i className=" bi bi-search"></i></span>
                <input type="search" className=" form-control w-25 me-auto" style={{width:500}} placeholder="Buscar..." name="" id="" />
                </div>

                <button className ="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createProductModal">
                    <i className="bi bi-plus-lg">
                         Agregar producto
                    </i>
                </button>
            </section>
            <section className="mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Marca</th>
                                <th scope="col">C. Unitario</th>
                                <th scope="col">A la venta</th>
                                <th scope="col" className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProjectRow />
                        </tbody>
                    </table>
                </div>
            </section>

            {/* MODAL */}
            <CreateProjectModal />
        </div>
    )
}