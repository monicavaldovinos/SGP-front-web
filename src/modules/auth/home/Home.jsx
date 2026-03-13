import "../../../styles/home.css";

export default function Home() {
  const proyectos = [
    {
      id: 1,
      nombre: "Sistema de inventarios",
      equipo: "Equipo Alpha",
      presupuesto: "$ 80,000.00",
      progreso: 15,
    },
    {
      id: 2,
      nombre: "Sistema objetos perdidos",
      equipo: "Equipo Gamma",
      presupuesto: "$ 80,000.00",
      progreso: 15,
    },
  ];

  return (
    <div className="home-wrapper">
      <section className="home-panel">
        <div className="home-title-box">
          <h2 className="home-title">
            <i className="bi bi-house-door-fill me-3"></i>
            Inicio
          </h2>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <article className="summary-card">
              <div className="summary-left">
                <div className="summary-icon-box">
                  <i className="bi bi-person-fill summary-icon"></i>
                </div>
                <span className="summary-label">Líderes</span>
              </div>
              <span className="summary-number">10</span>
            </article>
          </div>

          <div className="col-md-4">
            <article className="summary-card">
              <div className="summary-left">
                <div className="summary-icon-box">
                  <i className="bi bi-people-fill summary-icon"></i>
                </div>
                <span className="summary-label">Equipos</span>
              </div>
              <span className="summary-number">6</span>
            </article>
          </div>

          <div className="col-md-4">
            <article className="summary-card summary-card-projects">
              <div className="summary-left">
                <div className="summary-icon-box summary-icon-box-projects">
                  <i className="bi bi-folder-fill summary-icon-projects"></i>
                </div>
                <span className="summary-label">Proyectos</span>
              </div>
              <span className="summary-number summary-number-projects">12</span>
            </article>
          </div>
        </div>

        <div className="projects-header">
          <h2 className="projects-title">Proyectos activos</h2>
        </div>

        <section className="projects-toolbar">
          <div className="search-box">
            <span className="search-icon">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="search-input"
              placeholder="Buscar proyectos..."
            />
          </div>

          <div className="status-buttons">
            <button type="button" className="status-btn risk-btn">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              En riesgo
            </button>

            <button type="button" className="status-btn stable-btn">
              <i className="bi bi-check-lg me-2"></i>
              Estables
            </button>
          </div>
        </section>

        <div className="row g-4 mt-1">
          {proyectos.map((proyecto) => (
            <div className="col-md-6 col-lg-4" key={proyecto.id}>
              <article className="project-card">
                <div className="project-top">
                  <div className="project-icon-box">
                    <i className="bi bi-clipboard-data project-icon"></i>
                  </div>

                  <div className="project-info">
                    <h5 className="project-name">{proyecto.nombre}</h5>
                    <p className="project-team">{proyecto.equipo}</p>
                  </div>
                </div>

                <hr className="project-divider" />

                <div className="project-budget-row">
                  <span className="project-budget-label">Presupuesto</span>
                  <span className="project-budget-value">{proyecto.presupuesto}</span>
                </div>

                <div className="progress custom-progress">
                  <div
                    className="progress-bar custom-progress-bar"
                    style={{ width: `${proyecto.progreso}%` }}
                  ></div>
                </div>

                <div className="project-progress-text">{proyecto.progreso}%</div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}