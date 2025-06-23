import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggingIn: false,
  setIsLoggingIn: (state) => set({ isLoggingIn: state }),

  updatePasswordDialogOpen: false,
  setUpdatePasswordDialogOpen: (state) =>
    set({ updatePasswordDialogOpen: state }),
}));
