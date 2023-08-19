export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
  image?: File;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
  image?: File;
}

export interface Session {
  id: number | null;
  access: string | null;
  refresh: string | null;
  profile: UserProfile | null;
}

export interface AuthState {
  session: Session;
  appLoading: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}
