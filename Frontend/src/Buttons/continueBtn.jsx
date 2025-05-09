import { useNavigate } from "react-router-dom";
import "./continueBtn.css";
function ContinueBtn() {
  const navigate = useNavigate();
  return (
    <button className="continue-button" onClick={navigate("LogIn/Password")}>
      Nästa
    </button>
  );
}
export default ContinueBtn;
