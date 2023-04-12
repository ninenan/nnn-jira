export * as Epic from "./modules/epic";

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
  organization: string;
  ownerId: number;
  personId: number;
  pin?: boolean;
}

export type NoopType = () => void;

export interface ITask {
  id: number;
  name: string;
  processorId: number; // 经办人
  projectId: number;
  epicId: number; // 任务组
  kanbanId: number;
  typeId: number; // bug or task
  note: string;
}

export interface IKanban {
  id: number;
  name: string;
  projectId: number;
}

export interface ITaskType {
  id: number;
  name: string;
}
