import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage.jsx";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <>
      <h1>Hello</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile/:id" element={<ProfilePage />} />
        <Route path="LogIn" element={<LogIn />} />
        <Route path="SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
