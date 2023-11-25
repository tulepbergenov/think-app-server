import { ETaskStatus } from 'src/tasks/task.model';
import { z } from 'zod';

export const TaskRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  color: z.string().min(4).max(9).regex(/^#/),
});

export const TasksFilterSchema = z.object({
  status: z.nativeEnum(ETaskStatus).optional(),
  search: z.string().optional(),
});
