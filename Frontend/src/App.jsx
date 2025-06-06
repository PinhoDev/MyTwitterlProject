import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Pages/Profile.jsx";
import LogIn from "./Pages/LogIn";
import LogInPassword from "./Pages/LogInPassword.jsx";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/profile/:user" element={<Profile />} />
        <Route
          path="/home"
          element={
            <Navigate
              to={`/home/${localStorage.getItem("username") || "guest"}`}
            />
          }
        />
        <Route path="/home/:user" element={<Home />} />
        <Route path="/loginpassword" element={<LogInPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
