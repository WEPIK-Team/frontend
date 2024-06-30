export interface AuthClientConfig {
  basePath: string;
}

export interface User {
  email?: string;
  nickname?: string;
  role?: string;
}

export interface Session {
  user?: User;
}
