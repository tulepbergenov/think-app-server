import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ETaskStatus, ITask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  @ApiOperation({ summary: 'Get tasks' })
  getAllTasks(): ITask[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get task by id' })
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete task by id' })
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  @ApiOperation({ summary: 'Update task status' })
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: ETaskStatus,
  ): ITask {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update task' })
  updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): ITask {
    return this.tasksService.updateTask(id, createTaskDto);
  }
}
