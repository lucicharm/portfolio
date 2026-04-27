// Hardcoded credentials - replace with your values
export const CREDENTIALS = {
  username: "demo",
  password: "password",
};

// Feature flag check
export function isAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";
}

// localStorage key
export const AUTH_TOKEN_KEY = "portfolio-auth-token";

// Validate credentials
export function validateCredentials(
  username: string,
  password: string
): boolean {
  return (
    username === CREDENTIALS.username && password === CREDENTIALS.password
  );
}

// Token helpers
export function setAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, "authenticated");
  }
}

export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
