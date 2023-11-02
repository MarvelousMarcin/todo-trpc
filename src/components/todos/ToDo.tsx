"use client";

import { ToDo } from "@prisma/client";
import { FC, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { client } from "@/app/_trpc/client";

interface ToDoProps {
  todo: ToDo;
}

const ToDo: FC<ToDoProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.isDone);
  const utils = client.useUtils();
  const mutation = client.setTodoDone.useMutation({
    onSuccess: (data) => {
      utils.getTodos.invalidate();
    },
  });

  const handleTodoClick = () => {
    mutation.mutate({ isDone: !isDone, todoId: todo.id });
    setIsDone(!isDone);
  };

  const priority =
    todo.priority === "LOW"
      ? "Low"
      : todo.priority === "MEDIUM"
      ? "Medium"
      : "High";

  return (
    <Card
      onClick={handleTodoClick}
      className="flex items-center justify-between gap-6 p-3 mt-3 hover:bg-accent cursor-pointer"
    >
      <section className="flex items-center gap-6 ">
        <Checkbox checked={isDone} />
        <h1 className={cn(isDone && "line-through text-gray-400")}>
          {todo.title}
        </h1>
      </section>
      <Badge
        className={cn(
          "bg-green-300 hover:bg-green-300",
          priority === "Medium" && "bg-orange-300 hover:bg-orange-300",
          priority === "High" && "bg-red-400 hover:bg-red-400"
        )}
      >
        {priority}
      </Badge>
    </Card>
  );
};

export default ToDo;
