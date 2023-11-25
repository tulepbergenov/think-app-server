import { createZodDto } from 'nestjs-zod';
import { TasksFilterSchema } from 'src/contracts';

export class GetTasksFilterDto extends createZodDto(TasksFilterSchema) {}
