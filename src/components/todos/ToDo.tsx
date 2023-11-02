"use client";

import { ToDo } from "@prisma/client";
import { FC, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { client } from "@/app/_trpc/client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CalendarIcon, Check, Trash } from "lucide-react";
import { format } from "date-fns";

interface ToDoProps {
  todo: ToDo;
}

const ToDo: FC<ToDoProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState(todo.isDone);
  const utils = client.useUtils();

  const { mutate: setDone } = client.setTodoDone.useMutation({
    onSuccess: () => {
      utils.getTodos.invalidate();
    },
  });

  const { mutate: deleteTodo } = client.deleteTodo.useMutation({
    onSuccess: () => {
      utils.getTodos.invalidate();
    },
  });

  const handleTodoClick = () => {
    setDone({ isDone: !isDone, todoId: todo.id });
    setIsDone(!isDone);
  };

  const handleDelete = () => {
    deleteTodo({ todoId: todo.id });
    utils.getTodos.setData(undefined, (prevData: ToDo[] | undefined) => {
      if (!prevData) return prevData;

      return prevData.filter((item) => item.id !== todo.id);
    });
  };

  const priority =
    todo.priority === "LOW"
      ? "Low"
      : todo.priority === "MEDIUM"
      ? "Medium"
      : "High";

  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
          <section className="flex gap-5 justify-end">
            <div className="flex items-center ">
              {todo.deadline && <CalendarIcon className="mr-2 h-4 w-4" />}
              {todo.deadline && format(todo.deadline, "PP")}
            </div>
            <Badge
              className={cn(
                "bg-green-400 hover:bg-green-400 min-w-[4.5rem] justify-center",
                priority === "Medium" && "bg-orange-300 hover:bg-orange-300",
                priority === "High" && "bg-red-400 hover:bg-red-400"
              )}
            >
              {priority}
            </Badge>
          </section>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="flex gap-1" onClick={handleTodoClick}>
          <Check size={18} />
          {isDone ? "Uncheck" : "Check"}
        </ContextMenuItem>
        <ContextMenuItem className="flex gap-1" onClick={handleDelete}>
          <Trash size={18} />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ToDo;
