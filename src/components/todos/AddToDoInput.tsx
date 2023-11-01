"use client";

import { useAdd } from "@/store/isAddStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AlertOctagon, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Priority } from "@prisma/client";

type ToDoInput = {
  title: string;
  priority: Priority;
  date: Date | undefined;
  isDone: boolean;
};

const AddToDoInput = ({}) => {
  const { isAdding, setIsAdd } = useAdd();

  useEffect(() => {
    return () => setIsAdd(false);
  }, [setIsAdd]);

  const [todo, setTodo] = useState<ToDoInput>({
    title: "",
    priority: "LOW",
    date: new Date(),
    isDone: false,
  });

  if (!isAdding) return <></>;

  return (
    <div className="flex items-center gap-6">
      <Checkbox
        onCheckedChange={(check) => setTodo({ ...todo, isDone: !!check })}
      />
      <div>
        <Input
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          className="w-40 pl-2 border-none"
          placeholder="New task"
        />
      </div>
      <div className="flex items-center justify-center">
        <AlertOctagon className="mr-2 h-4 w-4" />

        <Select
          onValueChange={(value: Priority) =>
            setTodo({ ...todo, priority: value })
          }
          defaultValue="LOW"
        >
          <SelectTrigger className="w-[100px] pl-0 border-none">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[130px] justify-start text-left font-normal border-none",
              !todo.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {todo.date ? format(todo.date, "PP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={todo.date}
            onSelect={(value) => setTodo({ ...todo, date: value })}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-3">
        <Check
          className="cursor-pointer"
          size={15}
          onClick={() => console.log(todo)}
        />
        <X
          className="cursor-pointer"
          size={15}
          onClick={() => setIsAdd(false)}
        />
      </div>
    </div>
  );
};

export default AddToDoInput;
