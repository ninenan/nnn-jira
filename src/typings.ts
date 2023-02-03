export interface IUser {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
  ownerId: string;
}

export interface ISimpleUser {
  username: string;
  password: string;
}

export interface IProject {
  created: number;
  id: number;
  name: string;
  organiztation: string;
  ownerId: number;
  personId: number;
}
