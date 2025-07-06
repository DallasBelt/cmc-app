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

import { useAppointments } from '@/hooks';
import { useAppointmentStore } from '@/store';

export const ChangeAppointmentStatusDialog = () => {
  const { changeAppointmentStatusMutation } = useAppointments();

  const { appointmentData } = useAppointmentStore();

  const { changeAppointmentStatusDialog } = useAppointmentStore((state) => ({
    changeAppointmentStatusDialog: state.changeAppointmentStatusDialog,
  }));
  const { setChangeAppointmentStatusDialog } = useAppointmentStore((state) => ({
    setChangeAppointmentStatusDialog: state.setChangeAppointmentStatusDialog,
  }));

  return (
    <AlertDialog
      open={changeAppointmentStatusDialog}
      onOpenChange={setChangeAppointmentStatusDialog}
    >
      <AlertDialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Se va a ${appointmentData.status === 'canceled' ? 'reagendar' : 'cancelar'} una cita`}
          </AlertDialogTitle>
          <AlertDialogDescription>¿Está seguro(a)?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, volver</AlertDialogCancel>
          <AlertDialogAction asChild className='bg-red-600 text-white hover:bg-red-500'>
            <Button
              onClick={() => {
                changeAppointmentStatusMutation.mutate({
                  appointmentId: appointmentData.id,
                  appointmentStatus: appointmentData.status,
                });
              }}
              disabled={changeAppointmentStatusMutation.isPending}
            >
              {changeAppointmentStatusMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )}
              {appointmentData.status === 'canceled' ? 'Sí, reagendar' : 'Sí, cancelar'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
