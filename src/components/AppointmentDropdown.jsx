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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { useAppointments } from '@/hooks/useAppointments';
import { useAppointmentStore } from '@/store/useAppointmentStore';

export const AppointmentDropdown = () => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  const { handleChangeAppointmentStatus, handleDeleteAppointment } =
    useAppointments(role, token);

  const setDialogOpen = useAppointmentStore((state) => state.setDialogOpen);

  const dropdownOpen = useAppointmentStore((state) => state.dropdownOpen);
  const setDropdownOpen = useAppointmentStore((state) => state.setDropdownOpen);
  const dropdownPosition = useAppointmentStore(
    (state) => state.dropdownPosition
  );

  const appointmentId = useAppointmentStore((state) => state.appointmentId);
  const appointmentStatus = useAppointmentStore(
    (state) => state.appointmentStatus
  );

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
            setDialogOpen(true);
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
              <AlertDialogDescription>Confirmar acción</AlertDialogDescription>
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
                      appointmentStatus
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
              <AlertDialogDescription>Confirmar acción</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, volver</AlertDialogCancel>
              <AlertDialogAction
                asChild
                className='bg-red-600 text-white hover:bg-red-500'
              >
                <Button onClick={() => handleDeleteAppointment(appointmentId)}>
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
  );
};
