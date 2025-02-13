import { create } from 'zustand';

export const usePatientStore = create((set) => ({
  // New patient modal
  createPatientModal: false,
  setCreatePatientModal: (state) => set({ createPatientModal: state }),
  // Edit patient flag
  editPatient: false,
  setEditPatient: (mode) => set({ editPatient: mode }),
  // Patient ID
  patientId: null,
  setPatientId: (id) => set({ patientId: id }),
}));
