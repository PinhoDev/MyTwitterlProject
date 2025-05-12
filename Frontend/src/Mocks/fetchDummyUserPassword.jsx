import users from "./DummyUsers.json";

export const fetchDummyUserPassword = (identifier, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(
        (user) =>
          user.username === identifier ||
          user.email === identifier ||
          user.phone === identifier
      );
      if (!user) {
        resolve({ success: false, message: "Användaren finns inte" });
      } else if (user.password !== password) {
        resolve({ success: false, message: "Fel lösenord" });
      } else {
        resolve({ success: true, user });
      }
    }, 400);
  });
};
