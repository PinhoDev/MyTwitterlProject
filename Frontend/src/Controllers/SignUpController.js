import {
  getUsername,
  postNewUser,
  postUserImage,
} from "../Model/requestApi.js";

//Validation for the form
export function validateForm(newUser) {
  const required = {
    username: "Användarnamn",
    email: "E-post",
    name: "Namn",
    password: "Lösenord",
    confirmPassword: "Bekräfta lösenord",
  };
  for (const [key, label] of Object.entries(required)) {
    if (!newUser[key]?.trim()) {
      return `${label} måste fyllas i`;
    }
  }
  // Check if username is all lowercase
  if (newUser.username !== newUser.username.toLowerCase()) {
    return "Användarnamnet måste vara i små bokstäver";
  }
  // Check if password is the same as confirmPassword
  if (newUser.password !== newUser.confirmPassword) {
    return "Lösenorden matchar inte";
  }

  return null;
}

export async function createNewUser(newUser, setError) {
  // Check if the username already exists
  const usernameCheck = await getUsername(newUser.username);
  if (usernameCheck.success) {
    return { success: false, message: "Användarnamnet är redan upptaget" };
  }

  // Check if the email already exists
  const emailCheck = await getUsername(newUser.email);
  if (emailCheck.success) {
    return { success: false, message: "E-postadressen är redan registrerad" };
  }

  // If neither exists, register the user
  const response = await postNewUser(newUser);
  if (response.success) {
    // If new user have image, upload into Backend
    if (newUser.image) {
      uploadUserImage(newUser.image, newUser.username);
    }
    // Response for successful registration
    return { success: true, message: "Användaren har registrerats" };
  } else {
    // Response for failed registration
    return {
      success: false,
      message: response.message || "Registreringen misslyckades",
    };
  }
}

export async function uploadUserImage(image, username) {
  const response = await postUserImage(image, username);
  if (response.success) {
    return {
      success: true,
      message: "Bilden har laddats upp",
      imageUrl: response.imageUrl, // Fortsätter rutten från uploadendpoints för att skicka tillbaka bilden
    };
  } else {
    return {
      success: false,
      message: response.message || "Bilduppladdningen misslyckades",
    };
  }
}
///Ska kolla om jag hittar den här någonannanstans annars lägger jag den här Karolina 30 maj
export async function postUserBackground(image, username) {
  try {
    const response = await fetch(
      `http://localhost:3000/${username}/background`,
      {
        method: "POST",
        body: image, // ← formData
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        imageUrl: data.imageUrl, // ✅ se till att backend skickar detta
      };
    } else {
      return {
        success: false,
        message: data.message || "Något gick fel vid uppladdning",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Serverfel vid uppladdning",
    };
  }
}
