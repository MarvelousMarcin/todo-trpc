"use client";

import { useAdd } from "@/store/isAddStore";
import { BadgePlus } from "lucide-react";
import { motion } from "framer-motion";
const AddToDoBtn = ({}) => {
  const { isAdding, setIsAdd } = useAdd();

  return (
    <motion.button
      animate={{ scale: isAdding ? 0 : 1 }}
      onClick={() => setIsAdd(true)}
      className="w-fit cursor-pointer"
    >
      <BadgePlus className="text-red-500" />
    </motion.button>
  );
};

export default AddToDoBtn;
