import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  // New appointment modal
  createAppointmentDialog: false,
  setCreateAppointmentDialog: (state) =>
    set({ createAppointmentDialog: state }),
  // Appointment ID
  appointmentId: null,
  setAppointmentId: (id) => set({ appointmentId: id }),
  // Appointment date
  appointmentDate: '',
  setAppointmentDate: (date) => set({ appointmentDate: date }),
  // Appointment start time
  appointmentStartTime: '',
  setAppointmentStartTime: (startTime) =>
    set({ appointmentStartTime: startTime }),
  // Appointment status
  appointmentStatus: '',
  setAppointmentStatus: (status) => set({ appointmentStatus: status }),
  // Appointment dropdown
  appointmentDropdown: false,
  setAppointmentDropdown: (state) => set({ appointmentDropdown: state }),
  appointmentDropdownPosition: { top: 0, left: 0 },
  setAppointmentDropdownPosition: (position) =>
    set({ appointmentDropdownPosition: position }),
  // Change appointment status dialog
  changeAppointmentStatusDialog: false,
  setChangeAppointmentStatusDialog: (state) =>
    set({ changeAppointmentStatusDialog: state }),
  // Delete appointment dialog
  deleteAppointmentDialog: false,
  setDeleteAppointmentDialog: (state) =>
    set({ deleteAppointmentDialog: state }),
  // Edit appointment flag
  editAppointment: false,
  setEditAppointment: (state) => set({ editAppointment: state }),
}));
