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
import { client } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "../ui/card";

type ToDoInput = {
  title: string;
  priority: Priority;
  deadline: Date | undefined;
  isDone: boolean;
};

let defaultInput = {
  title: "",
  priority: Priority.LOW,
  deadline: undefined,
  isDone: false,
};

const AddToDoInput = ({}) => {
  const { isAdding, setIsAdd } = useAdd();
  const { toast } = useToast();
  const utils = client.useUtils();

  const addTodo = client.addTodo.useMutation({
    onError: (err) => {
      if (err.data?.zodError?.fieldErrors.title) {
        toast({
          title: err.data?.zodError?.fieldErrors?.title[0] + "  😉",
          description: "There was some problem with your todo",
        });
      }
    },
    onSuccess: () => {
      utils.getTodos.invalidate();
      setTodo(defaultInput);
      setIsAdd(false);
    },
  });

  useEffect(() => {
    return () => setIsAdd(false);
  }, [setIsAdd]);

  const [todo, setTodo] = useState<ToDoInput>(defaultInput);

  if (!isAdding) return <></>;

  const handleAddTodo = () => {
    addTodo.mutate(todo);
  };

  return (
    <Card className="flex items-center gap-9 px-3 py-1 mt-3 w-full">
      <Checkbox
        onCheckedChange={(check) => setTodo({ ...todo, isDone: !!check })}
      />
      <div>
        <Input
          maxLength={20}
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          className="w-40 pl-2 border-none"
          placeholder="New task"
        />
      </div>
      <div className="flex items-center justify-center">
        <AlertOctagon
          className={cn(
            "mr-2 h-4 w-4",
            todo.priority === "LOW"
              ? "text-green-700"
              : todo.priority === "MEDIUM"
              ? "text-yellow-600"
              : "text-red-500"
          )}
        />

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
              "w-[140px] justify-start text-left font-normal border-none",
              !todo.deadline && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {todo.deadline ? (
              format(todo.deadline, "PP")
            ) : (
              <span>Pick a deadline</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={todo.deadline}
            onSelect={(value) => setTodo({ ...todo, deadline: value })}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-3">
        <Check
          className="cursor-pointer text-green-700"
          size={15}
          onClick={handleAddTodo}
        />
        <X
          className="cursor-pointer text-red-500"
          size={15}
          onClick={() => setIsAdd(false)}
        />
      </div>
    </Card>
  );
};

export default AddToDoInput;
