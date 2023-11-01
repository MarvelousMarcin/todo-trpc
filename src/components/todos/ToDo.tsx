"use client";

import { ToDo } from "@prisma/client";
import { FC } from "react";

interface ToDoProps {
  todo: ToDo;
}

const ToDo: FC<ToDoProps> = ({ todo }) => {
  return <div>ToDo</div>;
};

export default ToDo;
