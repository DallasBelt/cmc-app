import { create } from 'zustand';

export const usePatientStore = create((set) => ({
  // New patient dialog
  createPatientDialog: false,
  setCreatePatientDialog: (state) => set({ createPatientDialog: state }),
  // Edit patient flag
  editPatient: false,
  setEditPatient: (mode) => set({ editPatient: mode }),
  // Patient ID
  patientId: null,
  setPatientId: (id) => set({ patientId: id }),
}));
