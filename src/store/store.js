import { create } from 'zustand';

// Registration modal store
export const useRegistrationStore = create((set) => ({
  modalState: false,
  setModalState: (state) => set({ modalState: state }),
}));

// New patient modal store
export const useNewPatientModalStore = create((set) => ({
  modalState: false,
  setModalState: (state) => set({ modalState: state }),
}));

// Store for the toast
export const useToastStore = create((set) => ({
  showToast: false,
  toastMessage: '',
  setToast: (show, message) => set({ showToast: show, toastMessage: message }),
}));
