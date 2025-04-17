export interface User {
  info: UserInfo;
  token: string;
  roles: Array<string>;
  permissions: Array<string>;
}

export interface UserInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  name: string;
}
