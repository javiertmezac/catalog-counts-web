export interface User {
  id_token: string | undefined;
  username: string | undefined;
  roles: number[];
  defaultBranch: number;
}
