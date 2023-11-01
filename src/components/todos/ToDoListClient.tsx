"use client";

import { client } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/server";
import { FC } from "react";
import ToDo from "./ToDo";

interface ToDoListClientProps {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}

const ToDoListClient: FC<ToDoListClientProps> = ({ initialTodos }) => {
  const todosQuery = client.getTodos.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialData: initialTodos,
  });

  if (todosQuery.isLoading) return <div>Is Loading...</div>;

  const todos = todosQuery.data;
  return (
    <div className="w-[35rem] h-full flex-col">
      {todos?.map((todo) => (
        <ToDo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ToDoListClient;
