import { create } from "zustand";

export interface adminOrderSearchState {
  search: string;

  getSearch: () => string;
  updateSearch: (search: string) => void;
}

export const useAdminOrderSearchState = create<adminOrderSearchState>(
  (set, get) => ({
    search: "",
    getSearch: () => get().search,
    updateSearch: (search) => set({ search }),
  }),
);
