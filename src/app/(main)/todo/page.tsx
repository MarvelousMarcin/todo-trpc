import AddToDoBtn from "@/components/todos/AddToDoBtn";
import AddToDoInput from "@/components/todos/AddToDoInput";
import ToDoList from "@/components/todos/ToDoList";

const Home = ({}) => {
  return (
    <div className="h-screen flex flex-col max-w-[70rem] mx-auto md:px-28 py-28 px-3 w-full md:w-[calc(100vw-8rem)]">
      <h1 className="font-bold tracking-wider text-xl gap-20 flex items-center">
        <div>Your todos</div>
        <AddToDoBtn />
      </h1>
      <main className="mt-10 h-full">
        <ToDoList />
      </main>
    </div>
  );
};

export default Home;
