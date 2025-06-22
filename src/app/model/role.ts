export enum Role {
  Treasure = 1,
  Secretary = 2,
  SuperAdmin = 3
}

export interface RoleDefinition {
  name: string,
  role: Role
}