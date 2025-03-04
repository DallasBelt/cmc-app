import { create } from 'zustand';

export const useRegistrationStore = create((set) => ({
  registrationDialog: false,
  setRegistrationDialog: (state) => set({ registrationDialog: state }),
}));
