import { PropsWithChildren } from "react";
import Logo from "@/components/menu/Logo";
import Menu from "@/components/menu/Menu";
import SignOutBtn from "@/components/menu/SignOutBtn";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <nav className="hidden md:flex h-screen w-32  items-center flex justify-between py-10 flex-col ">
        <div className="flex-col items-center">
          <Logo />
          <Menu />
        </div>
        <SignOutBtn />
      </nav>
      {children}
    </div>
  );
};

export default layout;
