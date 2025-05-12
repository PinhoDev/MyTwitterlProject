import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage.jsx";
import LogIn from "./Pages/LogIn";
import LogInPassword from "./Pages/LogInPassword.jsx";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="login" element={<LogIn />} />
        <Route path="loginpassword" element={<LogInPassword />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
