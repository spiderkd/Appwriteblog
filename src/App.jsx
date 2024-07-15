import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { /*Footer,*/ Header } from "./components";
import { Outlet } from "react-router-dom";
import Meteors from "./components/magicui/meteors";

// import AnimatedGridPattern from "./components/magicui/animated-grid-pattern";
// import { cn } from "./lib/utils";

// import AnimatedGridPatternDemo from "./components/ui/AnimatedGrid";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#111] ">
      <div className="w-full block">
        <Header />
        <Meteors number={30} />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null;
}

export default App;
