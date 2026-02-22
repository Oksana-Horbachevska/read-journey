export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponseRegister = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponseLogin = {
  email: string;
  password: string;
};

export type AuthResponseLogout = {
  message: string;
};

export type CheckCurrentUser = {
  success: boolean;
  user?: {
    _id: string;
    name: string;
    email: string;
    token: string;
    refreshToken: string;
  };
};

export type RefreshCurrentUser = {
  success: boolean;
  user?: {
    token: string;
    refreshToken: string;
  };
};

export interface ApiBackendError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?: number;
  };
  message: string;
}
