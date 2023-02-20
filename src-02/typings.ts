export interface ErrorRespone extends Error {
  data: string;
  error: Error;
  internal: boolean;
  status: number;
  statusText: string;
}

export interface IContact {
  id: string;
  first: string;
  last: string;
  favorite: boolean;
  twitter: string;
  avatar: string;
  notes: string;
}
