// src/utils/localDB.js
// Centralized local "DB" helper. Uses localStorage as the main persistence.
// Also can generate a single .js export file (download) that contains all data.

const USERS_KEY = "users";
const ALL_DELIVERIES_KEY = "deliveries"; // optional global list for admin
// Per-user deliveries keys: user_<id>_deliveries
// Per-user data keys: user_<id>_data

export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
};

export const saveAllUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  window.dispatchEvent(new Event("usersUpdated"));
};

/** create user and set up per-user storage */
export const createUser = (userObj) => {
  const users = getAllUsers();
  users.push(userObj);
  saveAllUsers(users);

  // create per-user data (profile)
  localStorage.setItem(`user_${userObj.id}_data`, JSON.stringify(userObj));

  // optionally maintain global deliveries array (for admin)
  const global = JSON.parse(localStorage.getItem(ALL_DELIVERIES_KEY) || "[]");
  localStorage.setItem(ALL_DELIVERIES_KEY, JSON.stringify(global));

  // notify other tabs / components
  window.dispatchEvent(new Event("usersUpdated"));
  return userObj;
};

export const getUserData = (userId) => {
  return JSON.parse(localStorage.getItem(`user_${userId}_data`) || "null");
};

export const saveUserData = (userId, data) => {
  localStorage.setItem(`user_${userId}_data`, JSON.stringify(data));
  window.dispatchEvent(new Event("userDataUpdated"));
};

/** Per-user deliveries */
export const getUserDeliveries = (userId) => {
  return JSON.parse(localStorage.getItem(`user_${userId}_deliveries`) || "[]");
};

export const saveUserDelivery = (userId, delivery) => {
  const existing = getUserDeliveries(userId);
  existing.push(delivery);
  localStorage.setItem(`user_${userId}_deliveries`, JSON.stringify(existing));

  // Also push into a global deliveries list for admin
  const global = JSON.parse(localStorage.getItem(ALL_DELIVERIES_KEY) || "[]");
  global.push({ ...delivery, userId });
  localStorage.setItem(ALL_DELIVERIES_KEY, JSON.stringify(global));

  window.dispatchEvent(new Event("deliveriesUpdated"));
  return existing;
};

export const updateUserDeliveryStatus = (userId, deliveryId, status) => {
  const list = getUserDeliveries(userId).map((d) => (d.id === deliveryId ? { ...d, status } : d));
  localStorage.setItem(`user_${userId}_deliveries`, JSON.stringify(list));

  // update global deliveries too
  const global = JSON.parse(localStorage.getItem(ALL_DELIVERIES_KEY) || "[]").map((g) =>
    g.id === deliveryId && g.userId === userId ? { ...g, status } : g
  );
  localStorage.setItem(ALL_DELIVERIES_KEY, JSON.stringify(global));
  window.dispatchEvent(new Event("deliveriesUpdated"));
  return list;
};

export const getAllDeliveriesGlobal = () => {
  return JSON.parse(localStorage.getItem(ALL_DELIVERIES_KEY) || "[]");
};

/** Download a single JS file containing the whole DB */
export const exportLocalDBAsJSFile = (filename = "local_db.js") => {
  const payload = {
    users: getAllUsers(),
    deliveriesGlobal: getAllDeliveriesGlobal(),
    // include per-user deliveries as well
  };

  // also include per-user deliveries explicitly
  const users = payload.users || [];
  payload.userDeliveries = {};
  users.forEach((u) => {
    payload.userDeliveries[u.id] = getUserDeliveries(u.id);
  });

  // the JS content we generate assigns to window.__LOCAL_DB__
  const contents =
    "/* Local DB export - drop into browser or import to seed app */\n" +
    `window.__LOCAL_DB__ = ${JSON.stringify(payload, null, 2)};\n` +
    "/* call loadLocalDB(window.__LOCAL_DB__) in console or app to import */";

  const blob = new Blob([contents], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

/** Import a local DB object (the same structure exported above) */
export const importLocalDBObject = (obj) => {
  if (!obj) return;
  if (obj.users) {
    saveAllUsers(obj.users);
  }
  if (obj.deliveriesGlobal) {
    localStorage.setItem(ALL_DELIVERIES_KEY, JSON.stringify(obj.deliveriesGlobal));
  }
  if (obj.userDeliveries) {
    Object.keys(obj.userDeliveries).forEach((uid) => {
      localStorage.setItem(`user_${uid}_deliveries`, JSON.stringify(obj.userDeliveries[uid] || []));
    });
  }
  window.dispatchEvent(new Event("usersUpdated"));
  window.dispatchEvent(new Event("deliveriesUpdated"));
};
