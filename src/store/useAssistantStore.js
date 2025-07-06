import { create } from 'zustand';

export const useAssistantStore = create((set) => ({
  dialogOpen: false,
  setDialogOpen: (state) => set({ dialogOpen: state }),
  medicId: null,
  setMedicId: (id) => set({ medicId: id }),
}));
