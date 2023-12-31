import { Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus, ITask } from './task.model';
import { v4 as uuid } from 'uuid';
import {
  CreateTaskDto,
  GetTasksFilterDto,
  UpdateTaskStatusDto,
} from './task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      search.toLowerCase();

      tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  createTask({ title, description, color }: CreateTaskDto): ITask {
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

  getTaskById(id: string): ITask {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return foundTask!;
  }

  deleteTaskById(id: string): void {
    const foundTask = this.getTaskById(id);

    const filterTasks = this.tasks.filter((task) => task.id !== foundTask.id);

    this.tasks = filterTasks;
  }

  updateTaskStatus(id: string, { status }: UpdateTaskStatusDto): ITask {
    const task = this.getTaskById(id);

    task.status = status;

    return task;
  }

  updateTask(id: string, { title, description, color }: CreateTaskDto): ITask {
    const task = this.getTaskById(id);

    Object.assign(task, { title, description, color });

    return task;
  }
}
