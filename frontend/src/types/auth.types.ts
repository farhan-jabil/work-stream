export interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "employee";
  employeeCount?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface DecodedToken {
  id: string;
  userName: string;
  role: "admin" | "employee";
  exp: number;
  iat: number;
}

// Form validation error shapes (renamed to avoid clashing with each other)
export interface SignupFormErrors {
  name?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginFormErrors {
  userName?: string;
  password?: string;
}