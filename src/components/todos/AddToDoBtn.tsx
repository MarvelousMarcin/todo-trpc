"use client";

import { useAdd } from "@/store/isAddStore";
import { BadgePlus } from "lucide-react";

const AddToDoBtn = ({}) => {
  const { isAdding, setIsAdd } = useAdd();

  return (
    <button onClick={() => setIsAdd(true)} className="w-fit cursor-pointer">
      <BadgePlus className="text-red-500" />
    </button>
  );
};

export default AddToDoBtn;
