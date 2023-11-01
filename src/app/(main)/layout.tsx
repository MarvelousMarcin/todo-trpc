import { PropsWithChildren } from "react";
import { BarChart4, CheckSquare, Clock, DoorOpen } from "lucide-react";
import Logo from "@/components/menu/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <nav className="h-screen w-32  items-center flex justify-between py-10 flex-col">
        <div className="flex flex-col items-center">
          <Logo />
          <menu className="text-xs mt-9 flex items-center w-full text-[#343a40]">
            <ul className="space-y-3 flex flex-col items-center w-full">
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/todo"
              >
                <li className="flex items-center w-full text-xs gap-1 cursor-pointer p-1">
                  <CheckSquare size={18} />
                </li>
              </Link>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/pomodoro"
              >
                <li className="flex items-center text-xs  gap-1 cursor-pointer p-1">
                  <Clock size={18} />
                </li>
              </Link>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/stats"
              >
                <li className="flex items-center text-xs  gap-1 cursor-pointer p-1">
                  <BarChart4 size={18} />
                </li>
              </Link>
            </ul>
          </menu>
        </div>
        <Button variant="ghost" className="group">
          <DoorOpen
            size={18}
            className="cursor-pointer group-hover:text-red-500 transition-colors"
          />
        </Button>
      </nav>

      {children}
    </div>
  );
};

export default layout;
