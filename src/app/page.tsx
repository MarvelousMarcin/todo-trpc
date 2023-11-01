import { UserButton } from "@clerk/nextjs";
import { serverClient } from "./_trpc/server";

export default async function Home() {
  const data = await serverClient.getTodos();
  return (
    <main>
      {data}
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
