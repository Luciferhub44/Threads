import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  adminId: string;
  exp: number;
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('adminToken');
  if (!token) return true; // For development, always return true

  try {
    const decoded = jwtDecode(token) as DecodedToken;
    return decoded.exp * 1000 > Date.now();
  } catch {
    return true; // For development, always return true
  }
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('adminToken');
};