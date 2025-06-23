import { Link } from 'react-router-dom';

import { toast } from 'sonner';
import { ClockAlert, Loader2 } from 'lucide-react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { AppointmentDropdown } from '@/components/appointments';
import { EventContent } from '@/components/calendar';
import { useTheme } from '@/components/theme/ThemeProvider';

import { useAppointments, useCalendar, useSchedule } from '@/hooks';

export function Calendar() {
  setDefaultOptions({ locale: es });
  const { effectiveTheme } = useTheme();

  const {
    hiddenDays,
    isAllowedClick,
    isEmpty,
    isLoading,
    slotMaxTime,
    slotMinTime,
  } = useSchedule();

  const { appointmentsQuery } = useAppointments();
  const { getEventClassNames, handleDateClick, handleEventClick } =
    useCalendar();

  const appointments =
    appointmentsQuery.data?.data.map((e) => ({
      id: e.id,
      title: `${e.patient.firstName} ${e.patient.lastName}`,
      start: e.startTime,
      end: e.endTime,
      extendedProps: {
        createdAt: e.createdAt,
        medic: e.medic,
        patient: e.patient,
        status: e.status,
        updatedAt: e.updatedAt,
      },
    })) || [];

  // const slotLaneClassNames = (slotInfo) => {
  //   const slotDate = slotInfo.date; // Esto ya es un Date
  //   if (!(slotDate instanceof Date)) {
  //     console.warn('slotLaneClassNames: slotDate no es Date válido', slotDate);
  //     return [];
  //   }

  //   console.log('schedule:', schedule);
  //   console.log(
  //     'slotDate:',
  //     slotDate,
  //     'instanceof Date?',
  //     slotDate instanceof Date
  //   );

  //   const permitido = isAllowedClick(schedule, slotDate);

  //   return permitido
  //     ? []
  //     : [
  //         'bg-[repeating-linear-gradient(-45deg,_#f87171_0_4px,_transparent_4px,_transparent_8px)]',
  //         'cursor-not-allowed',
  //         'opacity-60',
  //       ];
  // };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <Loader2 className='animate-spin w-10 h-10 text-primary' />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className='flex flex-col items-center justify-center h-[50vh] text-center'>
        <ClockAlert size={200} className='text-red-500 mb-4' />
        <h1 className='text-3xl font-bold mb-2'>
          Todavía no ha creado un horario.
        </h1>
        <Link
          to='/profile'
          className='text-blue-600 hover:underline text-lg transition-all'
        >
          Puede crearlo en su Perfil.
        </Link>
      </div>
    );
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
        eventClassNames={getEventClassNames}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
        height='auto'
        validRange={{ start: startOfToday() }}
        hiddenDays={hiddenDays}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        slotDuration='00:15:00'
        slotLabelInterval='00:30:00'
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dateClick={(info) => {
          if (!isAllowedClick(info.date)) {
            toast.error('Este horario no está disponible.');
            return;
          }
          handleDateClick(info);
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
