import { useState } from "react";
import { postUserBackground } from "../Controllers/SignUpController.js";

const ChangeBackgroundButton = ({ currentImage, username, onImageChange }) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleBackgroundChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const result = await postUserBackground(formData, username); // ✅ här!

    if (result.success && result.imageUrl) {
      onImageChange(result.imageUrl);
      setStatusMessage("Bakgrundsbild uppdaterad!");
    } else {
      setStatusMessage(result.message || "Uppladdning misslyckades");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleBackgroundChange}
        style={{ display: "none" }}
        id="upload-background-input"
      />
      <label htmlFor="upload-background-input" className="upload-button">
        <h1>🖼️</h1>
      </label>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ChangeBackgroundButton;
