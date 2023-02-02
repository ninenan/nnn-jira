export interface IUser {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface ISimpleUser {
  username: string;
  password: string;
}
