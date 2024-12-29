import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { useQuery } from '@tanstack/react-query';

import { format, setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { toast } from 'sonner';
import { RotatingLines } from 'react-loader-spinner';

import { useTheme } from '@/components/theme-provider';
import { getAppointments } from '@/api/fetchAppointments';

import { AppointmentDialog } from './AppointmentDialog';
import { AppointmentDropdown } from './AppointmentDropdown';

import { useAppointmentStore } from '@/store/useAppointmentStore';

export function Scheduler() {
  setDefaultOptions({ locale: es }); // FullCalendar language
  const { effectiveTheme } = useTheme(); // App theme

  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  const {
    data: appointments,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
  });

  const setDialogOpen = useAppointmentStore((state) => state.setDialogOpen);
  const setDropdownOpen = useAppointmentStore((state) => state.setDropdownOpen);
  const setDropdownPosition = useAppointmentStore(
    (state) => state.setDropdownPosition
  );
  const setAppointmentDate = useAppointmentStore(
    (state) => state.setAppointmentDate
  );
  const setAppointmentStartTime = useAppointmentStore(
    (state) => state.setAppointmentStartTime
  );
  const setAppointmentId = useAppointmentStore(
    (state) => state.setAppointmentId
  );
  const setAppointmentStatus = useAppointmentStore(
    (state) => state.setAppointmentStatus
  );

  const handleDateClick = (arg) => {
    if (role === 'medic') {
      setAppointmentDate(arg.date);
      setAppointmentStartTime(format(arg.date, 'HH:mm'));
      setDialogOpen(true);
    } else {
      return;
    }
  };

  const handleEventClick = async (info) => {
    // if (isAssistant) {

    // }
    setDropdownOpen(true);
    setDropdownPosition({
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

  if (loading) {
    return (
      <span className='ms-2'>
        <RotatingLines
          visible={true}
          height='20'
          width='20'
          strokeColor='#FFF'
          strokeWidth={5}
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
        />
      </span>
    );
  }

  if (error) {
    return toast.error('Oops...', {
      description: 'Error en la solicitud.',
    });
  }

  return (
    <div className={effectiveTheme === 'dark' ? 'dark' : ''}>
      <FullCalendar
        locale={esLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        allDaySlot={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        weekends={true}
        firstDay={1}
        events={appointments}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        eventClassNames={(eventInfo) => {
          // Check the status of the event
          if (eventInfo.event.extendedProps.status === 'canceled') {
            return ['bg-red-600', 'cursor-pointer'];
          }
          return ['cursor-pointer'];
        }}
        dateClick={handleDateClick}
        slotMinTime='07:00:00'
        slotMaxTime='19:30:00'
        height='auto'
        hiddenDays={[0]}
        validRange={{
          start: startOfToday(),
        }}
      />

      <AppointmentDialog />

      <AppointmentDropdown />
    </div>
  );
}

const renderEventContent = (eventInfo) => {
  return (
    <div className='flex flex-col'>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
};
