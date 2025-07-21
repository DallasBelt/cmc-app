import { format } from 'date-fns';

import { useAppointmentStore, usePatientStore } from '@/store';

export const useCalendar = () => {
  const {
    setAppointmentData,
    setAppointmentDropdown,
    setAppointmentDropdownPosition,
    setCreateAppointmentDialog,
  } = useAppointmentStore();

  const { setPatientData } = usePatientStore();

  const handleDateClick = (arg) => {
    setAppointmentData({
      date: arg.date,
      startTime: format(arg.date, 'HH:mm'),
    });

    setCreateAppointmentDialog(true);
  };

  const handleEventClick = async (info) => {
    setAppointmentData({
      id: info.event.id,
      status: info.event.extendedProps.status,
      patient: info.event.extendedProps.patient,
      medic: info.event.extendedProps.medic,
    });

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
