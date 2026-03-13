import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../auth/home/Home";
import Error404 from "../error/Error404";
import CustomSidebar from "../auth/components/CustomSidebar";
import Projects from "../auth/projects/Project";
import Teams from "../auth/teams/Teams";
import Users from "../auth/users/Users";

export default function AuthRouter({ setSession }) {
  return (
    <main className="row m-0" style={{ minHeight: "100vh" }}>
      <CustomSidebar setSession={setSession} />

      <div className="col-10 p-0 d-flex flex-column">
        <header
          className="text-white d-flex align-items-center px-4"
          style={{
            height: "86px",
            background: "linear-gradient(90deg, #12495c, #1d6b72)",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Gestión de proyectos
        </header>

        <div className="p-5" style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/auth/home" element={<Home />} />
            <Route path="/auth/projects" element={<Projects />} />
            <Route path="/auth/teams" element={<Teams />} />
            <Route path="/auth/users" element={<Users />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}