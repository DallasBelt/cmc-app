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

export function Scheduler() {
  setDefaultOptions({ locale: es });

  const [dialogState, setDialogState] = useState(false);

  const setStartTime = useStartTimeStore((state) => state.setStartTime);
  const setDate = useDateStore((state) => state.setDate);

  const handleDateClick = (arg) => {
    setDate(arg.date);
    setStartTime(format(arg.date, 'HH:mm'));
    setDialogState(true);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Check auth
  //       const token = sessionStorage.getItem('token');
  //       if (!token) {
  //         toast.error('Oops!', {
  //           description: 'Error de autenticación.',
  //         });
  //         return;
  //       }

  //       // Get request to find all patients
  //       const res = await axios.get('http://localhost:3000/api/v1/patient', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (res.status === 200) {
  //         const formattedData = res.data.data.map((patient) => ({
  //           key: patient.id,
  //           value: `${patient.firstName} ${patient.lastName}`,
  //         }));
  //         setSearchData(formattedData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [dialogState]);

  const dayCellClassNames = () => 'cursor-pointer';

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
        events={[
          {
            title: 'Diego Lascano',
            start: '2024-08-29T10:00:00',
            end: '2024-08-29T11:00:00',
          },
          {
            title: 'Elvia Correa',
            start: '2024-08-24T12:00:00',
            end: '2024-08-24T12:30:00',
          },
        ]}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        slotMinTime='07:00:00'
        slotMaxTime='19:30:00'
        height='auto'
        firstDay={1}
        hiddenDays={[0]}
        validRange={{
          start: startOfToday(),
        }}
        dayCellClassNames={dayCellClassNames}
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
