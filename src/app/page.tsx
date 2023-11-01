import { UserButton } from "@clerk/nextjs";
import { serverClient } from "./_trpc/server";

export default async function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
