import { BranchToProduct } from "@prisma/client";
import { create } from "zustand";
import { getBtp } from "@/app/actions/btp.actions";

export interface BranchToProductState {
  btps: BranchToProduct[];

  getAllBtps: (branchId: number) => Promise<BranchToProduct[]>;
  getCurrentBtp: (
    productId: number,
    branchId: number,
  ) => Promise<BranchToProduct[]>;
  setBtps: (btps: BranchToProduct[]) => void;
}

export const branchToProductStore = create<BranchToProductState>((set) => ({
  btps: [],
  getAllBtps: (branchId: number) => {
    return getBtp(undefined, branchId);
  },
  getCurrentBtp: async (productId: number, branchId: number) => {
    return await getBtp(productId, branchId);
  },
  setBtps: (btps: BranchToProduct[]) => set({ btps }),
}));
