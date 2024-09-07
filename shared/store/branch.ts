import { create } from "zustand";

export interface BranchState {
  branchId: number;
  setBranchId: (id: number) => void;
}

export const branchStore = create<BranchState>((set) => ({
  branchId: 1,
  setBranchId: (id) => set({ branchId: id }),
}));
