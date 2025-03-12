import { toast } from 'sonner';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { AppointmentDropdown, EventContent } from '@/components';
import { useAppointments, useScheduler } from '@/hooks';
import { useTheme } from '@/components/theme-provider';

export function Scheduler() {
  setDefaultOptions({ locale: es }); // FullCalendar language
  const { effectiveTheme } = useTheme(); // App theme

  const { appointmentsQuery } = useAppointments();
  const { getEventClassNames, handleDateClick, handleEventClick } =
    useScheduler();

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
        eventClassNames={getEventClassNames}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
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

      <AppointmentDropdown />
    </div>
  );
}
