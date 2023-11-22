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

  public getTask(id: string): ITask {
    const findTask = this.tasks.find((task) => task.id === id);

    return findTask;
  }
}
