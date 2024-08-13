import { create } from 'zustand';

// Store for the registration modal state
export const useRegistrationStore = create((set) => ({
  modal: false,
  setOpenModal: (value) => set({ modal: value }),
}));

// Store for the toast
export const useToastStore = create((set) => ({
  showToast: false,
  toastMessage: '',
  setToast: (show, message) => set({ showToast: show, toastMessage: message }),
}));
