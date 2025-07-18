import { format } from 'date-fns';

import { useAppointmentStore, usePatientStore } from '@/store';

export const useCalendar = () => {
  const {
    setAppointmentDropdown,
    setAppointmentDropdownPosition,
    setCreateAppointmentDialog,
    updateAppointmentField,
  } = useAppointmentStore();

  const { setPatientData } = usePatientStore();

  const handleDateClick = (arg) => {
    // Set date and startTime properties of appointmentStore
    updateAppointmentField('date', arg.date);
    updateAppointmentField('startTime', format(arg.date, 'HH:mm'));

    setCreateAppointmentDialog(true);
  };

  const handleEventClick = async (info) => {
    // Update id and status properties of appointmentStore
    updateAppointmentField('id', info.event.id);
    updateAppointmentField('status', info.event.extendedProps.status);
    updateAppointmentField('patient', info.event.extendedProps.patient);
    updateAppointmentField('medic', info.event.extendedProps.medic);

    // Update patientData store
    setPatientData(info.event.extendedProps.patientData);

    // Set dropdown state and position
    setAppointmentDropdown(true);
    setAppointmentDropdownPosition({
      top: info.jsEvent.clientY,
      left: info.jsEvent.clientX,
    });
  };

  const getEventClassNames = (eventInfo) => {
    const isCanceled = eventInfo.event.extendedProps.status === 'canceled';
    const isCompleted = eventInfo.event.extendedProps.status === 'completed';

    return isCanceled
      ? ['rounded-lg bg-red-400 border-red-400 cursor-pointer']
      : isCompleted
        ? ['rounded-lg bg-green-500 border-green-500 cursor-pointer']
        : ['rounded-lg cursor-pointer'];
  };

  return {
    getEventClassNames,
    handleDateClick,
    handleEventClick,
  };
};
