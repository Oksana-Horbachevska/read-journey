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
