import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BarChart4, CheckSquare, Clock } from "lucide-react";

const Menu = ({}) => {
  return (
    <menu className="text-xs mt-9 flex items-center w-full text-[#343a40]">
      <ul className="space-y-3 flex flex-col items-center w-full">
        <Link className={buttonVariants({ variant: "ghost" })} href="/todo">
          <li className="flex items-center w-full text-xs gap-1 cursor-pointer p-1">
            <CheckSquare size={18} />
          </li>
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/pomodoro">
          <li className="flex items-center text-xs  gap-1 cursor-pointer p-1">
            <Clock size={18} />
          </li>
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/stats">
          <li className="flex items-center text-xs  gap-1 cursor-pointer p-1">
            <BarChart4 size={18} />
          </li>
        </Link>
      </ul>
    </menu>
  );
};

export default Menu;
