//Validation for the form
export function validateForm(form) {
  const required = {
    username: "Användarnamn",
    email: "Epost",
    name: "Namn",
    password: "Lösenord",
    confirmPassword: "Bekräfta lösenord",
  };
  for (const [key, label] of Object.entries(required)) {
    if (!form[key]?.trim()) {
      return `${label} måste fyllas i`;
    }
  }
  if (form.password !== form.confirmPassword) {
    return "Det angivna lösenordet stämmer inte överens";
  }

  return null;
}

// Register a New User
export async function registerUser(form) {
  // Validación puede ir aquí o antes de llamar a esta función
  const postData = {
    username: form.username,
    email: form.email,
    name: form.name,
    password: form.password,
  };
  console.log("PostData", postData);
}
