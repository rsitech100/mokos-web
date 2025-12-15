export type UserRole = 'owner' | 'user' | 'admin';

export type Gender = 'male' | 'female';

export interface UserDetail {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth?: string;
  gender?: Gender;
  profileImage?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userDetail?: UserDetail;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}
