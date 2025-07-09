export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
