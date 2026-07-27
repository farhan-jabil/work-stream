import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  userName: string;
  role: "admin" | "employee";
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const getRoleFromToken = (token: string): "admin" | "employee" | null => {
  const decoded = decodeToken(token);
  return decoded?.role ?? null;
};