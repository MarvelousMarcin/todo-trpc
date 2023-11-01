"use client";

import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { DoorOpen } from "lucide-react";

const SignOutBtn = ({}) => {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <Button
      onClick={() => signOut(() => router.push("/"))}
      variant="ghost"
      className="group"
    >
      <DoorOpen
        size={18}
        className="cursor-pointer group-hover:text-red-500 transition-colors"
      />
    </Button>
  );
};

export default SignOutBtn;
