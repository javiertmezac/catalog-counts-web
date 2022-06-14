export interface User {
  id_token: string | undefined;
  username: string | undefined;
  userId: number;
  roles: number[];
  defaultBranch: number;
}
