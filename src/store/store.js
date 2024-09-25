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

// Toast store
export const useToastStore = create((set) => ({
  showToast: false,
  toastMessage: '',
  setToast: (show, message) => set({ showToast: show, toastMessage: message }),
}));

// Edit mode store
export const useEditModeStore = create((set) => ({
  editMode: false,
  setEditMode: (mode) => set({ editMode: mode }),
}));

export const usePatientIdStore = create((set) => ({
  patientId: null,
  setPatientId: (id) => set({ patientId: id }),
}));

export const useStartTimeStore = create((set) => ({
  startTime: '',
  setStartTime: (time) => set({ startTime: time }),
}));

export const useDateStore = create((set) => ({
  date: '',
  setDate: (date) => set({ date: date }),
}));

// New appointment dialog store
export const useNewAppointmentDialogStore = create((set) => ({
  dialogState: false,
  setDialogState: (state) => set({ dialogState: state }),
}));
