export enum role {
  common = 0,
  admin = 1,
}

export interface User {
  login: string;
  role: role;
}

export interface httpLogin {
  token: string;
}
