import { Injectable } from "@nestjs/common";
import { Router, Query, Mutation, Input } from "nestjs-trpc";
import { z } from "zod";
import {
  TodoSchema,
  CreateTodoSchema,
  UpdateTodoSchema,
  DeleteTodoSchema,
} from "@repo/trpc-contract";
import { TodoService } from "./todo.service";

@Injectable()
@Router({ alias: "todos" })
export class TodoRouter {
  constructor(private readonly todoService: TodoService) {}

  @Query({ output: z.array(TodoSchema) })
  getAll() {
    return this.todoService.getAll();
  }

  @Mutation({ input: CreateTodoSchema, output: TodoSchema })
  create(@Input() input: z.infer<typeof CreateTodoSchema>) {
    return this.todoService.create(input.title);
  }

  @Mutation({ input: UpdateTodoSchema, output: TodoSchema })
  update(@Input() input: z.infer<typeof UpdateTodoSchema>) {
    return this.todoService.update(input.id, {
      title: input.title,
      completed: input.completed,
    });
  }

  @Mutation({ input: DeleteTodoSchema, output: z.boolean() })
  delete(@Input() input: z.infer<typeof DeleteTodoSchema>) {
    return this.todoService.delete(input.id);
  }
}
