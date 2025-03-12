import { format } from 'date-fns';

import { useAppointmentStore } from '@/store';

export const useScheduler = () => {
  const setAppointmentDate = useAppointmentStore(
    (state) => state.setAppointmentDate
  );
  const setAppointmentStartTime = useAppointmentStore(
    (state) => state.setAppointmentStartTime
  );
  const setCreateAppointmentDialog = useAppointmentStore(
    (state) => state.setCreateAppointmentDialog
  );
  const setAppointmentDropdown = useAppointmentStore(
    (state) => state.setAppointmentDropdown
  );
  const setAppointmentDropdownPosition = useAppointmentStore(
    (state) => state.setAppointmentDropdownPosition
  );
  const setAppointmentId = useAppointmentStore(
    (state) => state.setAppointmentId
  );
  const setAppointmentStatus = useAppointmentStore(
    (state) => state.setAppointmentStatus
  );

  const handleDateClick = (arg) => {
    setAppointmentDate(arg.date);
    setAppointmentStartTime(format(arg.date, 'HH:mm'));
    setCreateAppointmentDialog(true);
  };

  const handleEventClick = async (info) => {
    // if (isAssistant) {

    // }
    setAppointmentDropdown(true);
    setAppointmentDropdownPosition({
      top: info.jsEvent.clientY,
      left: info.jsEvent.clientX,
    });
    // const appointment = {
    //   patient: info.event.title,
    //   date: info.event.start,
    //   startTime: info.event.start,
    //   endTime: info.event.end,
    // };
    setAppointmentId(info.event.id);
    setAppointmentStatus(info.event.extendedProps.status);
  };

  const getEventClassNames = (eventInfo) => {
    const isCanceled = eventInfo.event.extendedProps.status === 'canceled';

    return isCanceled
      ? ['rounded-lg bg-red-400 cursor-pointer']
      : ['rounded-lg cursor-pointer'];
  };

  return {
    getEventClassNames,
    handleDateClick,
    handleEventClick,
  };
};
