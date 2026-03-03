import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../auth/home/Home";
import Error404 from "../error/Error404";
import CustomSidebar from "../auth/components/CustomSidebar";
import Projects from "../auth/projects/Project";

export default function AuthRouter({setSession}) {

    return(<main className="row m-0">
        
        <CustomSidebar setSession={setSession} />
        <div className="p-5 col-10">
            <Routes>
                <Route path="/" element={<Navigate to="/auth/home" />} />
                <Route path="/auth/home" element ={<Home />} />
                <Route path="/auth/products" element ={<Projects />} />

                {/*  FALLBACK   */}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>

    
    </main>);
}