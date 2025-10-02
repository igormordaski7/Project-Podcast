export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe: boolean;
}