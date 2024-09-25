import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { format, setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AppointmentForm from '@/components/AppointmentForm';
import { useStartTimeStore, useDateStore } from '@/store/store';
import { useNewAppointmentDialogStore } from '@/store/store';

export function Scheduler() {
  setDefaultOptions({ locale: es });

  const dialogState = useNewAppointmentDialogStore(
    (state) => state.dialogState
  );
  const setDialogState = useNewAppointmentDialogStore(
    (state) => state.setDialogState
  );
  const setStartTime = useStartTimeStore((state) => state.setStartTime);
  const setDate = useDateStore((state) => state.setDate);

  // Clicking on a date in the calendar
  const handleDateClick = (arg) => {
    setDate(arg.date);
    setStartTime(format(arg.date, 'HH:mm'));
    setDialogState(true);
  };

  // Clicking on an event in the calendar
  const handleEventClick = (info) => {
    console.log('hey');
  };

  // Hook useAppointments

  const fetchEvents = async () => {
    const token = sessionStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/v1/appointment', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data.data;
  };

  const getData = async () => {
    const data = await fetchEvents();
    const finalData = [];
    data?.map((e) => {
      const temp = {
        title: `${e.patient.firstName} ${e.patient.lastName}`,
        start: `${e.startTime}`,
        end: `${e.endTime}`,
      };

      finalData.push(temp);
    });

    setEvents(finalData);
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
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
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        // dateClick={handleDateClick}
        slotMinTime='07:00:00'
        slotMaxTime='19:30:00'
        height='auto'
        hiddenDays={[0]}
        validRange={{
          start: startOfToday(),
        }}
      />

      {dialogState && (
        <Dialog open={dialogState} onOpenChange={setDialogState}>
          <DialogContent
            aria-describedby={undefined}
            className='max-w-md max-h-[80%] overflow-y-auto select-none'
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>Crear nueva cita</DialogTitle>
            </DialogHeader>
            <AppointmentForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <div className='flex flex-col'>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
