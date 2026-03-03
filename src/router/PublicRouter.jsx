import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../public/Login";
import Register from "../public/Register";
import PasswordRecovery from "../public/PasswordRecovery";
import Error404 from "../error/Error404";
import Error401 from "../error/Error401";

export default function PublicRouter({setSession}) {
    return(<>
        <Routes>
            <Route path="/" element = { <Navigate to = "/login" />} />
            <Route path="/login" element = {<Login setSession={setSession} />}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/recovery" element = {<PasswordRecovery />}/>

            {/*  FALLBACK   */}
            <Route path="*" element={ <Error404 /> } />
            <Route path="/auth/*" element={ <Error401 /> } />
        </Routes>
    </>);
}