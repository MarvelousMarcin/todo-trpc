import { UserButton } from "@clerk/nextjs";
import { PropsWithChildren } from "react";
import { ClipboardCheck } from "lucide-react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <nav className="h-screen w-36 flex items-center justify-between py-10 flex-col">
        <div className="flex gap-1">
          <ClipboardCheck className="text-rose-500" />

          <div>
            To<span className="text-rose-500 font-bold">Do</span>
          </div>
        </div>
        <UserButton />
      </nav>

      {children}
    </div>
  );
};

export default layout;
