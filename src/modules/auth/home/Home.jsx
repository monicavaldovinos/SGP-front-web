export default function Home() {
    return (
        <div>
            <h2>Sistema de Gestión de Proyectos</h2>

            <section className="mt-4">
                <div className="mb-3">
                    <h2>
                        <i className="bi bi-house-door-fill"></i>&nbsp;Inicio
                    </h2>
                </div>

                <div className="row g-3">
                    {/* Tarjeta Admins */}
                    <div className="col-4">
                        <div style={{ position: "relative", paddingBottom: "14px", paddingLeft: "14px", paddingRight: "14px" }}>
                            <div className="card border-0 shadow-sm rounded-4"
                                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", zIndex: 0, backgroundColor: "#ffffff" }}>
                            </div>
                            <article className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center justify-content-between rounded-4"
                                style={{ backgroundColor: "#EFF4F4", position: "relative", zIndex: 1 }}>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="p-2 rounded-3" style={{ backgroundColor: "#dce8e8" }}>
                                        <i className="bi bi-person-fill fs-4" style={{ color: "#4a7c7c" }}></i>
                                    </div>
                                    <span className="fw-semibold text-muted">Admins</span>
                                </div>
                                <span className="fw-bold fs-3" style={{ color: "#2c3e50" }}>10</span>
                            </article>
                        </div>
                    </div>

                    {/* Tarjeta Equipos */}
                    <div className="col-4">
                        <div style={{ position: "relative", paddingBottom: "14px", paddingLeft: "14px", paddingRight: "14px" }}>
                            <div className="card border-0 shadow-sm rounded-4"
                                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", zIndex: 0, backgroundColor: "#ffffff" }}>
                            </div>
                            <article className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center justify-content-between rounded-4"
                                style={{ backgroundColor: "#EFF4F4", position: "relative", zIndex: 1 }}>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="p-2 rounded-3" style={{ backgroundColor: "#dce8e8" }}>
                                        <i className="bi bi-people-fill fs-4" style={{ color: "#4a7c7c" }}></i>
                                    </div>
                                    <span className="fw-semibold text-muted">Equipos</span>
                                </div>
                                <span className="fw-bold fs-3" style={{ color: "#2c3e50" }}>6</span>
                            </article>
                        </div>
                    </div>

                    {/* Tarjeta Proyectos */}
                    <div className="col-4">
                        <div style={{ position: "relative", paddingBottom: "14px", paddingLeft: "14px", paddingRight: "14px" }}>
                            <div className="card border-0 shadow-sm rounded-4"
                                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", zIndex: 0, backgroundColor: "#ffffff" }}>
                            </div>
                            <article className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center justify-content-between rounded-4"
                                style={{ backgroundColor: "#fff0e6", position: "relative", zIndex: 1 }}>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="p-2 rounded-3" style={{ backgroundColor: "#fde0c8" }}>
                                        <i className="bi bi-folder-fill fs-4" style={{ color: "#e07b30" }}></i>
                                    </div>
                                    <span className="fw-semibold text-muted">Proyectos</span>
                                </div>
                                <span className="fw-bold fs-3" style={{ color: "#e07b30" }}>12</span>
                            </article>
                        </div>
                    </div>
                </div>

            </section>

            <br />
            <h2>Proyectos activos</h2>
            <section className="mt-4 d-flex aling-items-center">
                <div className="input-group me-auto" style={{width: 500}}>
                    <span className="input-group-text"><i className=" bi bi-search"></i></span>
                <input type="search" className=" form-control w-25 me-auto" style={{width:500}} placeholder="Buscar..." name="" id="" />
                </div>

                <button className ="btn btn-warning" data-bs-toggle="modal" data-bs-target="#createProductModal" style={{ background: "#FADEAC" }}>
                    <i className="bi bi-exclamation-triangle-fill">
                         En riesgo
                    </i>
                </button>
                <button className ="btn btn-success" data-bs-toggle="modal" data-bs-target="#createProductModal">
                    <i className="bi bi-check-lg">
                         Estables
                    </i>
                </button>
            </section>
        </div>
    )
}