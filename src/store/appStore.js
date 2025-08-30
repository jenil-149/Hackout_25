import { create } from "zustand";

export const useAppStore = create((set) => ({
  // Filters applied by user
  filters: null,
  setFilters: (f) => set({ filters: f }),

  // Suggestions returned from backend
  suggestions: [],
  setSuggestions: (s) => set({ suggestions: s }),

  // Currently selected site from list or map
  selectedSite: null,
  setSelectedSite: (site) => set({ selectedSite: site }),
  clearSelectedSite: () => set({ selectedSite: null }),
}));
