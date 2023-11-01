import { serverClient } from "@/app/_trpc/server";
import ToDoListClient from "./ToDoListClient";

const ToDoList = async () => {
  const todos = await serverClient.getTodos();

  return <ToDoListClient initialTodos={todos} />;
};

export default ToDoList;
