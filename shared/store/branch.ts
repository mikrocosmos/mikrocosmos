import { create } from "zustand";
import { changeBranch } from "@/app/actions/actions";

export interface BranchState {
  branchId: number;
  setBranchId: (id: number) => void;
}

export const branchStore = create<BranchState>((set) => ({
  branchId: 1,

  setBranchId: (id) => {
    set({ branchId: id });
    changeBranch(id);
  },
}));
