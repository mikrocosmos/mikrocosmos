import { create } from "zustand";
import { changeBranch } from "@/app/actions/actions";
import { getUserSession } from "@/shared/lib/getUserSession";

export interface BranchState {
  branchId: number;
  getBranchId: () => Promise<void>;
  setBranchId: (id: number) => void;
}

export const branchStore = create<BranchState>((set) => ({
  branchId: 1,
  getBranchId: async () => {
    const user = await getUserSession();
    if (!user) {
      set({ branchId: 1 });
    } else {
      set({ branchId: Number(user.currentBranchId) });
    }
  },
  setBranchId: (id) => {
    set({ branchId: id });
    changeBranch(id);
  },
}));
