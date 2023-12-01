import { createZodDto } from 'nestjs-zod';
import {
  TaskRequestSchema,
  TaskResponseSchema,
  TaskStatusRequestSchema,
  TasksFilterSchema,
} from './task.scheme';

export class CreateTaskDto extends createZodDto(TaskRequestSchema) {}

export class TaskDto extends createZodDto(TaskResponseSchema) {}

export class GetTasksFilterDto extends createZodDto(TasksFilterSchema) {}

export class UpdateTaskStatusDto extends createZodDto(
  TaskStatusRequestSchema,
) {}
