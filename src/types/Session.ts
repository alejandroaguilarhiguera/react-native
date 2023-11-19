export interface User {
  id: number;
  username: string;
  email: string;
  provider: 'local';
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  jwt: string;
  user: User;
}
