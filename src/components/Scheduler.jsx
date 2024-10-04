import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { format, setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { toast } from 'sonner';

import { CalendarCheck2, Pencil, Trash, X } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { useTheme } from '@/components/theme-provider';
import AppointmentForm from '@/components/AppointmentForm';

// Zustand states
import { useStartTimeStore, useDateStore } from '@/store/store';
import {
  useEventDropdownStore,
  useNewAppointmentDialogStore,
} from '@/store/store';

export function Scheduler() {
  setDefaultOptions({ locale: es }); // FullCalendar language
  const { effectiveTheme } = useTheme(); // App theme

  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  const dialogState = useNewAppointmentDialogStore(
    (state) => state.dialogState
  );
  const setDialogState = useNewAppointmentDialogStore(
    (state) => state.setDialogState
  );

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownState = useEventDropdownStore((state) => state.dropdownState);
  const setDropdownState = useEventDropdownStore(
    (state) => state.setDropdownState
  );

  const setStartTime = useStartTimeStore((state) => state.setStartTime);
  const setDate = useDateStore((state) => state.setDate);

  const [events, setEvents] = useState([]);
  const [appointmentId, setAppointmentId] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState({});

  // Clicking on a date in the calendar
  const handleDateClick = (arg) => {
    if (role === 'medic') {
      setDate(arg.date);
      setStartTime(format(arg.date, 'HH:mm'));
      setDialogState(true);
    } else {
      return;
    }
  };

  // Clicking on an event in the calendar
  const handleEventClick = async (info) => {
    // if (isAssistant) {

    // }
    setDropdownState(true);
    setDropdownPosition({
      top: info.jsEvent.clientY,
      left: info.jsEvent.clientX,
    });
    const appointment = {
      patient: info.event.title,
      date: info.event.start,
      startTime: info.event.start,
      endTime: info.event.end,
    };
    setAppointmentId(info.event.id);
    setAppointmentStatus(info.event.extendedProps.status);
  };

  const handleCancelAppointment = async () => {
    try {
      // Check auth
      if (!token) {
        console.error('Authentication error');
        toast.error('Oops!', {
          description: 'Error de autenticación.',
        });
        return;
      }

      // API call
      const res = await fetch(
        `http://localhost:3000/api/v1/appointment/${appointmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'canceled' }),
        }
      );

      if (!res.ok) {
        console.error('Request error:', res.statusText);
        return;
      }

      setAppointmentStatus('canceled');
      setDropdownState(false);

      toast.success('¡Enhorabuena!', {
        description: 'La cita ha sido cancelada.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      // Check auth
      if (!token) {
        console.error('Authentication error');
        toast.error('Oops!', {
          description: 'Error de autenticación.',
        });
        return;
      }

      // API call
      const res = await fetch(
        `http://localhost:3000/api/v1/appointment/${appointmentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error('Request error:', res.statusText);
        return;
      }

      setDropdownState(false);

      toast.success('¡Enhorabuena!', {
        description: 'La cita ha sido eliminada.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    }
  };

  // Fetch appointments from the database
  const fetchData = async () => {
    try {
      // Check auth
      if (!token) {
        console.error('Authentication error');
        toast.error('Oops!', {
          description: 'Error de autenticación.',
        });
        return;
      }

      // API call
      const res = await fetch('http://localhost:3000/api/v1/appointment', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error('Request error:', res.statusText);
        return;
      }

      const data = await res.json();
      return data.data;
    } catch (error) {
      toast.error('Oops...', {
        description: 'Error en la solicitud.',
      });
    }
  };

  const getData = async () => {
    const data = await fetchData();
    const appointments = [];
    data?.map((e) => {
      const temp = {
        id: e.id,
        title: `${e.patient.firstName} ${e.patient.lastName}`,
        start: e.startTime,
        end: e.endTime,
        extendedProps: {
          status: e.status,
        },
      };

      appointments.push(temp);
    });

    return appointments;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const appointments = await getData();
      setEvents(appointments);
    };

    fetchEvents();
  }, [dialogState, events]);

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
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        eventClassNames={(eventInfo) => {
          // Check the status of the event
          if (eventInfo.event.extendedProps.status === 'canceled') {
            return [
              'bg-red-600',
              'text-white',
              'cursor-pointer',
              'line-through',
            ];
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

      {dropdownState && (
        <DropdownMenu open={dropdownState} onOpenChange={setDropdownState}>
          <DropdownMenuContent
            align='end'
            className='flex flex-col'
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            <DropdownMenuItem
              className={
                appointmentStatus === 'canceled' ? 'hidden' : 'cursor-pointer'
              }
              onSelect={(e) => {
                e.preventDefault();
                setDialogState(true);
              }}
            >
              <Pencil size={16} className='me-2' />
              Editar
            </DropdownMenuItem>

            <AlertDialog>
              <AlertDialogTrigger>
                <DropdownMenuItem
                  className={'cursor-pointer'}
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {appointmentStatus === 'canceled' ? (
                    <CalendarCheck2 size={16} className='me-2' />
                  ) : (
                    <X size={16} className='me-2' />
                  )}
                  {appointmentStatus === 'canceled' ? 'Reagendar' : 'Cancelar'}
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent
                className='max-w-xl max-h-[80%] overflow-y-auto'
                onInteractOutside={(e) => {
                  e.preventDefault();
                }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esto cancelará la cita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, volver</AlertDialogCancel>
                  <AlertDialogAction
                    asChild
                    className='bg-red-600 text-white hover:bg-red-500'
                  >
                    <Button onClick={() => handleCancelAppointment()}>
                      Sí, cancelar
                      {/* {isSubmitting && (
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
                        )} */}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Trash size={16} className='me-2' />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent
                className='max-w-xl max-h-[80%] overflow-y-auto'
                onInteractOutside={(e) => {
                  e.preventDefault();
                }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, volver</AlertDialogCancel>
                  <AlertDialogAction
                    asChild
                    className='bg-red-600 text-white hover:bg-red-500'
                  >
                    <Button onClick={() => handleDeleteAppointment()}>
                      Sí, borrar
                      {/* {isSubmitting && (
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
                        )} */}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
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
