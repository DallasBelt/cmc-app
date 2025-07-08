import { create } from 'zustand';

export const useMedicalRecordStore = create((set) => ({
  dialogOpen: false,
  setDialogOpen: (dialogOpen) => set({ dialogOpen }),
}));
