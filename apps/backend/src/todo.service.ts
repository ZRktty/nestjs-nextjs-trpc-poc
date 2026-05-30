import { Injectable } from "@nestjs/common";
import { Todo } from "@repo/trpc-contract";
import { randomUUID } from "crypto";

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: randomUUID(),
      title: "Buy groceries",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      title: "Read a book",
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];

  getAll(): Todo[] {
    return this.todos;
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: string, data: { title?: string; completed?: boolean }): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new Error(`Todo ${id} not found`);
    if (data.title !== undefined) todo.title = data.title;
    if (data.completed !== undefined) todo.completed = data.completed;
    return todo;
  }

  delete(id: string): boolean {
    const idx = this.todos.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Todo ${id} not found`);
    this.todos.splice(idx, 1);
    return true;
  }
}
