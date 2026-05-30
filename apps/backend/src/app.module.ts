import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";
import { TodoRouter } from "./todo.router";
import { TodoService } from "./todo.service";

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: "./src/@generated",
    }),
  ],
  providers: [TodoRouter, TodoService],
})
export class AppModule {}
