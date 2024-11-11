import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useAppointments } from '@/hooks/useAppointments';
import { useAppointmentStore } from '@/store/useAppointmentStore';

export const ChangeAppointmentStatusDialog = () => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  const { handleChangeAppointmentStatus } = useAppointments(role, token);

  const { changeStatusDialogOpen } = useAppointmentStore((state) => ({
    changeStatusDialogOpen: state.changeStatusDialogOpen,
  }));
  const { setChangeStatusDialogOpen } = useAppointmentStore((state) => ({
    setChangeStatusDialogOpen: state.setChangeStatusDialogOpen,
  }));

  const appointmentId = useAppointmentStore((state) => state.appointmentId);
  const appointmentStatus = useAppointmentStore(
    (state) => state.appointmentStatus
  );

  return (
    <AlertDialog
      open={changeStatusDialogOpen}
      onOpenChange={setChangeStatusDialogOpen}
    >
      <AlertDialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            {appointmentStatus === 'canceled'
              ? 'Reagendar cita'
              : 'Cancelar cita'}
          </AlertDialogTitle>
          <AlertDialogDescription>¿Está seguro(a)?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, volver</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className='bg-red-600 text-white hover:bg-red-500'
          >
            <Button
              onClick={() =>
                handleChangeAppointmentStatus(appointmentId, appointmentStatus)
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
  );
};
