// src/utils/userStorage.js
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveAllUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const createUser = (userObj) => {
  const users = getAllUsers();
  users.push(userObj);
  saveAllUsers(users);

  // Also create a per-user namespace for future use
  localStorage.setItem(`user_${userObj.id}_data`, JSON.stringify(userObj));

  // notify other parts of the app (admin dashboard) that users changed
  window.dispatchEvent(new Event("usersUpdated"));

  return userObj;
};

export const getUserData = (userId) => {
  return JSON.parse(localStorage.getItem(`user_${userId}_data`) || "null");
};

export const saveUserData = (userId, data) => {
  localStorage.setItem(`user_${userId}_data`, JSON.stringify(data));
};
