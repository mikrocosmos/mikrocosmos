import { create } from "zustand";

export interface adminProductSearchState {
  search: string;

  getSearch: () => string;
  updateSearch: (search: string) => void;
}

export const useAdminProductSearchStore = create<adminProductSearchState>(
  (set, get) => ({
    search: "",
    getSearch: () => get().search,
    updateSearch: (search) => set({ search }),
  }),
);
