import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../auth/home/Home";
import Error404 from "../error/Error404";
import CustomSidebar from "../auth/components/CustomSidebar";
import Projects from "../auth/projects/Project";
import Teams from "../auth/teams/Teams";
import Users from "../auth/users/Users";

export default function AuthRouter({ setSession }) {
  return (
    <main className="row m-0">
      <CustomSidebar setSession={setSession} />

      <div className="p-5 col-10">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </main>
  );
}