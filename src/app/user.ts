export interface Roles{
    admin:boolean
}
export interface User {
  id: string;
  email: string;
  userName: string;
  password: string;
  role: Roles;
}