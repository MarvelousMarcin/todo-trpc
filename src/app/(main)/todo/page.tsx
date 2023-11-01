import AddToDoBtn from "@/components/todos/AddToDoBtn";
import AddToDoInput from "@/components/todos/AddToDoInput";

const Home = ({}) => {
  return (
    <div className="h-screen p-28 w-[calc(100vw-8rem)]">
      <h1 className="font-bold tracking-wider text-xl gap-20 flex items-center">
        <div>Your todos</div>
        <AddToDoBtn />
      </h1>
      <main className="mt-10">
        <AddToDoInput />
      </main>
    </div>
  );
};

export default Home;
