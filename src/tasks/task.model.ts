export interface ITask {
  id: string;
  title: string;
  description: string;
  status: ETaskStatus;
  color: string;
}

export enum ETaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
