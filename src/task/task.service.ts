import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, title: 'NEST JS', isCompleted: false },
    { id: 2, title: 'Build API', isCompleted: true },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`); //404
      //throw new UnauthorizedException(); //401
      // throw new InternalServerErrorException();
    }
    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, description, priority, tags } = dto;
    const newTask = {
      id: this.tasks.length + 1,
      title: title,
      isCompleted: false,
      description: description,
      priority: priority,
      tags: tags,
    };
    this.tasks.push(newTask);
    //return true; можно вернуть либо тру, либо весь массив тасок с добавленной
    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;
    const task = this.findById(id);
    task.title = title;
    task.isCompleted = isCompleted;

    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id); //нашли таску
    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const task = this.findById(id); //нашли таску

    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return task; //возвращаем удаленную таску
  }
}
