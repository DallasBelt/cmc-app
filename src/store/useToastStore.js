import { create } from 'zustand';

export const useToastStore = create((set) => ({
  showToast: false,
  toastMessage: '',
  setToast: (show, message) => set({ showToast: show, toastMessage: message }),
}));
