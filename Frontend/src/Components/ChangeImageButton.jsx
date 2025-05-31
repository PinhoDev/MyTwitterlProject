import { useState } from "react";
import { postUserImage } from "../Model/requestApi.js";

const ChangeImageButton = ({ username, onImageChange }) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await postUserImage(file, username);

    if (result.success) {
      const ext = file.name.split(".").pop();
      const newImageUrl = `/userImage/${username}.${ext}?t=${Date.now()}`;
      onImageChange(newImageUrl);
      setStatusMessage("Bild uppdaterad!");
    } else {
      setStatusMessage(result.message || "Uppladdning misslyckades");
    }
  };

  return (
    <div>
      <input
        id="upload-image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="upload-image-input"
        className="upload-button"
        style={{ cursor: "pointer" }}
      >
        <h1>📷</h1>
      </label>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ChangeImageButton;
