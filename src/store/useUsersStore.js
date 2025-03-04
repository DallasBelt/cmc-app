import { create } from 'zustand';

export const useUsersStore = create((set) => ({
  dropdownMenu: false,
  setDropdownMenu: (state) => set({ dropdownMenu: state }),
}));
