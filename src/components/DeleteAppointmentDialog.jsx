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

export const DeleteAppointmentDialog = () => {
  const { deleteAppointmentMutation } = useAppointments();

  const appointmentId = useAppointmentStore((state) => state.appointmentId);
  const deleteAppointmentDialog = useAppointmentStore(
    (state) => state.deleteAppointmentDialog
  );
  const setDeleteAppointmentDialog = useAppointmentStore(
    (state) => state.setDeleteAppointmentDialog
  );

  return (
    <AlertDialog
      open={deleteAppointmentDialog}
      onOpenChange={setDeleteAppointmentDialog}
    >
      <AlertDialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Se va a eliminar una cita</AlertDialogTitle>
          <AlertDialogDescription>¿Está segur(a)?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, volver</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className='bg-red-600 text-white hover:bg-red-500'
          >
            <Button
              onClick={() => deleteAppointmentMutation.mutate(appointmentId)}
              disabled={deleteAppointmentMutation.isPending}
            >
              {deleteAppointmentMutation.isPending && (
                <Loader2 className='me-2 animate-spin' />
              )}
              Sí, borrar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
