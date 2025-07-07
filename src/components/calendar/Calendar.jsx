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
import { generateUnavailableBlocks } from '@/utils';

export function Calendar() {
  setDefaultOptions({ locale: es });
  const { effectiveTheme } = useTheme();
  const currentRole = sessionStorage.getItem('role');

  const { hiddenDays, isAllowedClick, isEmpty, isLoading, schedule, slotMaxTime, slotMinTime } =
    useSchedule();

  const { appointmentsQuery } = useAppointments();
  const { getEventClassNames, handleDateClick, handleEventClick } = useCalendar();

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
        reason: e.reason,
      },
    })) || [];

  const disabledTimeBlocks = generateUnavailableBlocks(schedule);

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
          {currentRole === 'assistant'
            ? 'El médico asignado aún no tiene un horario.'
            : 'Todavía no ha creado un horario.'}
        </h1>
        {currentRole !== 'assistant' && (
          <Link to='/profile' className='text-blue-600 hover:underline text-lg transition-all'>
            Puede crearlo en su Perfil.
          </Link>
        )}
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
        events={[...appointments, ...disabledTimeBlocks]}
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
            toast.error('No disponible.');
            return;
          }
          handleDateClick(info);
        }}
      />

      <AppointmentDropdown />
    </div>
  );
}
