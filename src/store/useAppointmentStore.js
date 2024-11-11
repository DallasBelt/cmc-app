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
  appointmentStatus: '',
  setAppointmentStatus: (status) => set({ appointmentStatus: status }),
  dropdownOpen: false,
  setDropdownOpen: (state) => set({ dropdownOpen: state }),
  dropdownPosition: { top: 0, left: 0 },
  setDropdownPosition: (position) => set({ dropdownPosition: position }),
  editDialogOpen: false,
  setEditDialogOpen: (state) => set({ editDialogOpen: state }),
  changeStatusDialogOpen: false,
  setChangeStatusDialogOpen: (state) => set({ changeStatusDialogOpen: state }),
  deleteDialogOpen: false,
  setDeleteDialogOpen: (state) => set({ deleteDialogOpen: state }),
}));
