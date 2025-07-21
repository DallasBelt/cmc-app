import { create } from 'zustand';

export const useMedicalRecordStore = create((set) => ({
  dialogOpen: false,
  setDialogOpen: (dialogOpen) => set({ dialogOpen }),
  detailsDialogOpen: false,
  setDetailsDialogOpen: (detailsDialogOpen) => set({ detailsDialogOpen }),
  updateAppointment: true,
  setUpdateAppointment: (updateAppointment) => set({ updateAppointment }),
}));
