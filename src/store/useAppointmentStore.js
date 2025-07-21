import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  // New appointment modal
  createAppointmentDialog: false,
  setCreateAppointmentDialog: (state) => set({ createAppointmentDialog: state }),

  // Appointment data
  appointmentData: {
    id: null,
    date: '',
    startTime: '',
    status: '',
    patient: {},
    medic: {},
  },
  setAppointmentData: (data) =>
    set((state) => ({
      appointmentData: {
        ...state.appointmentData,
        ...data,
      },
    })),

  // Appointment dropdown
  appointmentDropdown: false,
  setAppointmentDropdown: (state) => set({ appointmentDropdown: state }),
  appointmentDropdownPosition: { top: 0, left: 0 },
  setAppointmentDropdownPosition: (position) => set({ appointmentDropdownPosition: position }),

  // Change appointment status dialog
  changeAppointmentStatusDialog: false,
  setChangeAppointmentStatusDialog: (state) => set({ changeAppointmentStatusDialog: state }),

  // Delete appointment dialog
  deleteAppointmentDialog: false,
  setDeleteAppointmentDialog: (state) => set({ deleteAppointmentDialog: state }),

  // Edit appointment flag
  editAppointment: false,
  setEditAppointment: (state) => set({ editAppointment: state }),
}));
