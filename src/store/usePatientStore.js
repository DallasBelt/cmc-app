import { create } from 'zustand';

export const usePatientStore = create((set) => ({
  // New patient dialog
  createPatientDialog: false,
  setCreatePatientDialog: (state) => set({ createPatientDialog: state }),
  // Edit patient flag
  isEditingPatient: false,
  setIsEditingPatient: (flag) => set({ isEditingPatient: flag }),
  patientData: null,
  setPatientData: (data) => set({ patientData: data }),
}));
