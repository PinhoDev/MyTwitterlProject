import { useState } from "react";
import { postUserBackground } from "../Model/requestApi.js";

const ChangeBackgroundButton = ({ username, onImageChange }) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleBackgroundChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await postUserBackground(file, username);

    if (result.success) {
      const ext = file.name.split(".").pop();
      const newBackgroundUrl = `/background/${username}.${ext}?t=${Date.now()}`;
      onImageChange(newBackgroundUrl);
      setStatusMessage("Bakgrundsbild uppdaterad!");
    } else {
      setStatusMessage(result.message || "Uppladdning misslyckades");
    }
  };

  return (
    <div>
      <input
        id="upload-background-input"
        type="file"
        accept="image/*"
        onChange={handleBackgroundChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="upload-background-input"
        className="upload-button"
        style={{ cursor: "pointer" }}
      >
        <h1>🖼️</h1>
      </label>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ChangeBackgroundButton;
