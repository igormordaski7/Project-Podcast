export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  isLoggedIn: boolean;
}

export interface AuthFormData {
  name?: string;
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  rememberMe: boolean;
}
