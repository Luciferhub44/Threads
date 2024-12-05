const TOKEN_KEY = 'adminToken';

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  return true;
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};