import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/LoginBackground.css";   

export default function Login({ setSession }) {
  const navigate = useNavigate();

  const changeSession = () => {
    sessionStorage.setItem("token", "test.token.tiendita");
    navigate("/auth/home");
    setSession(true);
  };

  useEffect(() => {
    if (!!sessionStorage.getItem("token")) {
      navigate("/auth/home");
    }
  }, []);

  return (
    <div className="login-root">

      <div className="loginbackground">
        <div className="loginbackground-gridContainer">

          <div className="box-root flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
            <div className="box-root" style={{ backgroundImage: "linear-gradient(white 0%, rgb(247,250,252) 33%)", flexGrow: 1 }}></div>
          </div>

          <div className="box-root flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
            <div className="box-root box-divider--light-all-2 animationLeftRight" style={{ flexGrow: 1 }}></div>
          </div>

          <div className="box-root flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
            <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
          </div>

          <div className="box-root flex-flex" style={{ gridArea: "7 / start / auto / 4" }}>
            <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }}></div>
          </div>

          <div className="box-root flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
            <div className="box-root box-background--gray100 animationLeftRight" style={{ flexGrow: 1 }}></div>
          </div>

          <div className="box-root flex-flex" style={{ gridArea: "2 / 15 / auto / end" }}>
            <div className="box-root box-background--cyan200 animationRightLeft" style={{ flexGrow: 1 }}></div>
          </div>

        </div>
      </div>


      <main className="d-flex align-items-center justify-content-center" style={{ position: "relative", zIndex: 5 }}>
        <div>
          <div className="text-center">
            <p className="fw-bold" style={{ fontSize: 21, color: "#184052" }}>
              BIENVENIDO A SGP
            </p>
          </div>

          <div className="card border-0 rounded-4 shadow" style={{ width: 400, height: 430 }}>
            <div className="card-body">
              <p className="fw-bold mt-4" style={{ fontSize: 20 }}>
                Inicio de sesión
              </p>

              <form className="mt-4 row g-3">
                <div className="col-12">
                  <label>Correo electrónico</label>
                  <input type="text" className="form-control mt-2" />
                </div>

                <div className="col-12">
                  <label>Contraseña</label>
                  <input type="password" className="form-control mt-2 mb-3" />
                  <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
                </div>

                <div className="col-12 text-center mt-4">
                  <button onClick={changeSession} className="btn btn-degraded col-12">
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link to="/register">¿No tengo cuenta? Registrarme</Link>
          </div>
        </div>
      </main>
    </div>
  );
}