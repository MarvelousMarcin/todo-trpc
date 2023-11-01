"use client";

import { ToDo } from "@prisma/client";
import { FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface ToDoProps {
  todo: ToDo;
}

const ToDo: FC<ToDoProps> = ({ todo }) => {
  const priority =
    todo.priority === "LOW"
      ? "Low"
      : todo.priority === "MEDIUM"
      ? "Medium"
      : "High";

  return (
    <Card className="flex items-center justify-between gap-6 p-3 mt-3 hover:bg-accent cursor-pointer">
      <section className="flex items-center gap-6 ">
        <Checkbox defaultChecked={todo.isDone} />
        <h1>{todo.title}</h1>
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
