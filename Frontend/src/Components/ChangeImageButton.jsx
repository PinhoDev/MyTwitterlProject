import { useState } from "react";
import { uploadUserImage } from "../Controllers/SignUpController.js"; // Importera uploadUserImage-funktionen

const ChangeImageButton = ({ currentImage, username, onImageChange }) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const result = await uploadUserImage(formData, username);

    if (result.success) {
      const newImageUrl = `/userImage/${file.name}`; // justera om backend returnerar annan path
      onImageChange(newImageUrl); // lyfter upp ny bild till parent-komponent
      setStatusMessage("Bild uppdaterad!");
    } else {
      setStatusMessage(result.message || "Uppladdning misslyckades");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="upload-image-input"
      />
      <label htmlFor="upload-image-input" className="upload-button">
        <h1>📷</h1>
      </label>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ChangeImageButton;
