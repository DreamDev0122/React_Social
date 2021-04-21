const USER_TOKEN = 'user_token';
const USER = 'user';

export const clearToken = () => {
  localStorage.removeItem(USER_TOKEN);
}

export const getToken = () => {
  return localStorage.getItem(USER_TOKEN);
}

export const saveToken = (token) => {
  localStorage.setItem(USER_TOKEN, token);
}

export const clearUser = () => {
  clearToken();
  localStorage.removeItem(USER);
}

export const saveUser = (user, token) => {
  updateUser(user);
  saveToken(token);
}

export const updateUser = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
}

export const getUser = () => {
  return {
    token: getToken(),
    user: JSON.parse(localStorage.getItem(USER)),
  }
}
