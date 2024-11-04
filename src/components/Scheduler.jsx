import { useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { setDefaultOptions, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';

import { toast } from 'sonner';
import { RotatingLines } from 'react-loader-spinner';

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

// Custom hook
import { useAppointments } from '@/hooks/useAppointments';

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

  const [startTime, setStartTime] = useState('');
  const [date, setDate] = useState('');

  // Calling the custom hook
  const {
    appointments,
    loading,
    error,
    handleDateClick,
    handleEventClick,
    handleChangeAppointmentStatus,
    handleDeleteAppointment,
  } = useAppointments(role, token);

  const [appointmentId, setAppointmentId] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState({});

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
                <AlertDialogTitle>
                  {appointmentStatus === 'canceled'
                    ? '¿Reagendar cita?'
                    : '¿Cancelar cita?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Confirmar acción
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, volver</AlertDialogCancel>
                <AlertDialogAction
                  asChild
                  className='bg-red-600 text-white hover:bg-red-500'
                >
                  <Button
                    onClick={() =>
                      handleChangeAppointmentStatus(
                        appointmentId,
                        appointmentStatus,
                        setAppointmentStatus,
                        setDropdownState
                      )
                    }
                  >
                    {appointmentStatus === 'canceled'
                      ? 'Sí, reagendar'
                      : 'Sí, cancelar'}
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
                  Confirmar acción
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, volver</AlertDialogCancel>
                <AlertDialogAction
                  asChild
                  className='bg-red-600 text-white hover:bg-red-500'
                >
                  <Button
                    onClick={() =>
                      handleDeleteAppointment(appointmentId, setDropdownState)
                    }
                  >
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
