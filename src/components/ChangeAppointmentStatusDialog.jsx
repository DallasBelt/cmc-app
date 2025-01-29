import { Loader2 } from 'lucide-react';

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

import useAppointments from '@/hooks/useAppointments';
import { appointmentStore } from '@/store/appointmentStore';

export const ChangeAppointmentStatusDialog = () => {
  const { changeAppointmentStatusMutation } = useAppointments();

  const { changeStatusDialogOpen } = appointmentStore((state) => ({
    changeStatusDialogOpen: state.changeStatusDialogOpen,
  }));
  const { setChangeStatusDialogOpen } = appointmentStore((state) => ({
    setChangeStatusDialogOpen: state.setChangeStatusDialogOpen,
  }));

  const appointmentId = appointmentStore((state) => state.appointmentId);
  const appointmentStatus = appointmentStore(
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
              onClick={() => {
                changeAppointmentStatusMutation.mutate({
                  appointmentId,
                  appointmentStatus,
                });
              }}
              disabled={changeAppointmentStatusMutation.isPending}
            >
              {changeAppointmentStatusMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )}
              {appointmentStatus === 'canceled'
                ? 'Sí, reagendar'
                : 'Sí, cancelar'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
