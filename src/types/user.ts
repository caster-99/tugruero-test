export type Role = "admin" | "user";

export interface User {
  email: string;
  role: Role;
}
