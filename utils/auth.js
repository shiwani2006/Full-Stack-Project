const DEFAULT_USERS = [
  {
    id: 1,
    name: "Shiwani Dhalari",
    email: "shiwanidhalari@gmail.com",
    password: "123456",
    role: "user",
  },
  {
    id: 2,
    name: "Provider Demo",
    email: "provider@gmail.com",
    password: "123456",
    role: "provider",
  },
];

const USERS_KEY = "skillswap_users";
const CURRENT_USER_KEY = "currentUser";

export function initializeUsers() {
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
}

export function getAllUsers() {
  initializeUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveAllUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(user) {
  const users = getAllUsers();
  const alreadyExists = users.find(
    (u) => u.email.toLowerCase() === user.email.toLowerCase()
  );

  if (alreadyExists) {
    return { success: false, message: "Email already registered" };
  }

  const newUser = {
    id: Date.now(),
    ...user,
  };

  users.push(newUser);
  saveAllUsers(users);
  return { success: true, user: newUser };
}

export function loginUser(email, password) {
  const users = getAllUsers();

  const foundUser = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password === password.trim()
  );

  if (!foundUser) {
    return { success: false, message: "Invalid email or password" };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
  return { success: true, user: foundUser };
}

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function clearAllAuth() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function seedDemoUsers() {
  initializeUsers();
}