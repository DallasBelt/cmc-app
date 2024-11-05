import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  dialogOpen: false,
  setDialogOpen: (state) => set({ dialogOpen: state }),
  appointmentId: null,
  setAppointmentId: (id) => set({ appointmentId: id }),
  appointmentDate: '',
  setAppointmentDate: (date) => set({ appointmentDate: date }),
  appointmentStartTime: '',
  setAppointmentStartTime: (startTime) =>
    set({ appointmentStartTime: startTime }),
  setAppointmentStatus: (status) => set({ appointmentStatus: status }),
  appointmentStatus: '',
  dropdownOpen: false,
  setDropdownOpen: (state) => set({ dropdownOpen: state }),
  dropdownPosition: { top: 0, left: 0 },
  setDropdownPosition: (position) => set({ dropdownPosition: position }),
}));
