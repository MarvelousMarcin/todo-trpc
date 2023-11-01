import { create } from "zustand";

type Store = {
  isAdding: boolean;
  setIsAdd: (value: boolean) => void;
};

export const useAdd = create<Store>()((set) => ({
  isAdding: false,
  setIsAdd: (value) => set(() => ({ isAdding: value })),
}));
