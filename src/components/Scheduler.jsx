import { toast } from 'sonner';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { format, setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { AppointmentDialog, AppointmentDropdown } from '@/components';
import { useAppointments } from '@/hooks';
import { useAppointmentStore } from '@/store';
import { useTheme } from '@/components/theme-provider';

export function Scheduler() {
  setDefaultOptions({ locale: es }); // FullCalendar language
  const { effectiveTheme } = useTheme(); // App theme

  const role = sessionStorage.getItem('roles');

  const { appointmentsQuery } = useAppointments();

  // Zustand states
  const setCreateAppointmentDialog = useAppointmentStore(
    (state) => state.setCreateAppointmentDialog
  );
  const setAppointmentDropdown = useAppointmentStore(
    (state) => state.setAppointmentDropdown
  );
  const setAppointmentDropdownPosition = useAppointmentStore(
    (state) => state.setAppointmentDropdownPosition
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

  // When clicking on a date
  const handleDateClick = (arg) => {
    if (role === 'medic') {
      setAppointmentDate(arg.date);
      setAppointmentStartTime(format(arg.date, 'HH:mm'));
      setCreateAppointmentDialog(true);
    } else {
      return;
    }
  };

  // When clicling on an appointment
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
        events={appointmentsQuery.data}
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

      {appointmentsQuery.error &&
        toast.error('Oops...', {
          description: 'Error en la solicitud.',
        })}

      {/* <AppointmentDialog /> */}

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
