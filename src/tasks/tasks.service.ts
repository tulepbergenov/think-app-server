import { Injectable } from '@nestjs/common';
import { ETaskStatus, ITask } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  public getAllTasks(): ITask[] {
    return this.tasks;
  }

  public createTask({ title, description, color }: CreateTaskDto): ITask {
    const task: ITask = {
      id: uuid(),
      title,
      description,
      color,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public getTaskById(id: string): ITask {
    const findTask = this.tasks.find((task) => task.id === id);

    return findTask;
  }

  public deleteTaskById(id: string): void {
    const filterTasks = this.tasks.filter((task) => task.id !== id);

    this.tasks = filterTasks;
  }

  public updateTaskStatus(id: string, status: ETaskStatus): ITask {
    const task = this.getTaskById(id);

    task.status = status;

    return task;
  }

  public updateTask(
    id: string,
    { title, description, color }: CreateTaskDto,
  ): ITask {
    const task = this.getTaskById(id);

    Object.assign(task, { title, description, color });

    return task;
  }
}
