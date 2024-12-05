const TOKEN_KEY = 'adminToken';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

interface DecodedToken {
  role: string;
  exp: number;
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return false;
  }

  try {
    const decoded = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decoded.exp < currentTime) {
      clearAuthToken();
      return false;
    }
    
    return decoded.role === 'admin';
  } catch {
    clearAuthToken();
    return false;
  }
};

export const validateAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD && ADMIN_PASSWORD !== 'your_secure_admin_password';
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  // Trigger a custom event to notify other parts of the app
  window.dispatchEvent(new Event('auth-change'));
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  // Trigger a custom event to notify other parts of the app
  window.dispatchEvent(new Event('auth-change'));
};