import { NavLink, useNavigate } from "react-router-dom";

export default function CustomSidebar({setSession}) {

    const navigate =useNavigate();
    const closeSession =()=>{
        sessionStorage.removeItem('token');
        navigate('/');
        setSession(false);
    }
    return(
        <div className="p-4 col-2 bg-body-tertiary shadow">

            <div className="d-flex flex-column" style={{height: '100%'}}>
                <h5 className="mb-4"><i className="fs-3 bi bi-shop"></i>&nbsp; Utez</h5>
                <NavLink to="/home" className={({isActive}) => `text-start btn btn${isActive ? '' : '-outline'}-primary mb-3`}>
                    <i className="bi bi-house"></i>&nbsp;Incio
                </NavLink>
                
                <NavLink to="/teams" className={({ isActive }) =>`text-start btn btn${isActive ? "" : "-outline"}-primary mb-3`}>
                    <i className="bi bi-people"></i>&nbsp;Equipos
                </NavLink>

                <NavLink to="/projects" className={({isActive}) => `text-start btn btn${isActive ? '' : '-outline'}-primary mb-3`}>
                    <i className="bi bi-bag"></i>&nbsp;Proyectos
                </NavLink>

                <NavLink to="/users" className={({ isActive }) => `text-start btn btn${isActive ? "" : "-outline"}-primary mb-3`}>
                     <i className="bi bi-person"></i>&nbsp;Usuarios
                </NavLink>

                <NavLink to="/brands" className={({isActive}) => `text-start btn btn${isActive ? '' : '-outline'}-primary mb-3`}>
                    <i className="bi bi-tag"></i>&nbsp;Marcas
                </NavLink>




                <button onClick= {() => closeSession()}className="text-start btn btn-outline-danger mt-auto">
                    <i className="bi bi-box-arrow-left"></i>&nbsp;Cerrar sesión
                </button>
            </div>

        </div>
    );
}