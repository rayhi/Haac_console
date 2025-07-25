import { jwtDecode } from "jwt-decode";

export const isAuthenticated = (): { valid: boolean; reason?: string } => {
  const token = localStorage.getItem("authToken");

  if (!token) return { valid: false, reason: "No token found" };

  try {
    const decoded: any = jwtDecode(token);
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
      return { valid: false, reason: "Token expired" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, reason: "Invalid token" };
  }
};
