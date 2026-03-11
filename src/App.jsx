import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthRouter from "./router/AuthRouter";
import PublicRouter from "./router/PublicRouter";

export default function App() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    if(!session && !!sessionStorage.getItem('token')) {
      setSession(true);

    }
  }, [session]);

  return(session ? (
    <AuthRouter setSession={setSession} />
  ) : (
    <PublicRouter setSession={setSession} />
  ));

}