import { createZodDto } from 'nestjs-zod';
import { TaskRequestSchema } from 'src/contracts';

export class CreateTaskDto extends createZodDto(TaskRequestSchema) {}
