import { create } from 'zustand';

// Registration modal store
export const useRegistrationStore = create((set) => ({
  modalState: false,
  setModalState: (state) => set({ modalState: state }),
}));

// Toast store
export const useToastStore = create((set) => ({
  showToast: false,
  toastMessage: '',
  setToast: (show, message) => set({ showToast: show, toastMessage: message }),
}));
