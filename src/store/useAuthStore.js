import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggingIn: false,
  setIsLoggingIn: (state) => set({ isLoggingIn: state }),
}));
