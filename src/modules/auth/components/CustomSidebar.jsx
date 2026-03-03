import { NavLink, useNavigate } from "react-router-dom";

export default function CustomSidebar({setSession}) {

    const navigate = useNavigate();
    const closeSession = () => {
        sessionStorage.removeItem('token');
        navigate('/');
        setSession(false);
    }

    const linkClass = ({isActive}) =>
        `text-start text-white btn rounded-0 mb-1 w-100 ${isActive ? 'bg-white bg-opacity-25' : ''}`;

    return(
        <div className="col-2 bg-sidebar shadow p-4">
            <div className="d-flex flex-column" style={{height: '100%'}}>
                
                <h5 className="mb-4 text-white">
                    <i className="fs-3 bi bi-shop"></i>&nbsp; Tiendita
                </h5>

                <div style={{margin: '0 -1.5rem'}}>
                    <NavLink to="/auth/home" className={linkClass}
                        style={{paddingLeft: '1.5rem'}}>
                        <i className="bi bi-house-door-fill"></i>&nbsp;Inicio
                    </NavLink>

                    <NavLink to="/auth/teams" className={linkClass}
                        style={{paddingLeft: '1.5rem'}}>
                        <i className="bi bi-people-fill"></i>&nbsp;Equipos
                    </NavLink>

                    <NavLink to="/auth/projects" className={linkClass}
                        style={{paddingLeft: '1.5rem'}}>
                        <i className="bi bi-folder-fill"></i>&nbsp;Proyectos
                    </NavLink>

                    <NavLink to="/auth/users" className={linkClass}
                        style={{paddingLeft: '1.5rem'}}>
                        <i className="bi bi-person-fill"></i>&nbsp;Usuarios
                    </NavLink>

                    <NavLink to="/auth/payments" className={linkClass}
                        style={{paddingLeft: '1.5rem'}}>
                        <i className="bi bi-cash-stack"></i>&nbsp;Pagos
                    </NavLink>
                </div>

                <button onClick={() => closeSession()}
                    className="text-start btn btn-outline-light mt-auto w-70">
                    <i className="bi bi-box-arrow-left"></i>&nbsp;Cerrar sesión
                </button>
            </div>
        </div>
    );
}