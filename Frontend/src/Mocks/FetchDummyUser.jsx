import users from "./DummyUsers.json";
// Använd genom att importera {fetchDummyUser} Hämtar användare som har någon av de användarnamn, mail eller mobil som man anger
export const fetchDummyUser = (identifier) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(
        (user) =>
          user.username === identifier ||
          user.email === identifier ||
          user.phone === identifier
      );
      resolve(user);
    }, 400);
  });
