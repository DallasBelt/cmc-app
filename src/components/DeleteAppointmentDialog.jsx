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

export const DeleteAppointmentDialog = () => {
  const { deleteAppointmentMutation } = useAppointments();

  const appointmentId = appointmentStore((state) => state.appointmentId);

  const { deleteDialogOpen } = appointmentStore((state) => ({
    deleteDialogOpen: state.deleteDialogOpen,
  }));
  const { setDeleteDialogOpen } = appointmentStore((state) => ({
    setDeleteDialogOpen: state.setDeleteDialogOpen,
  }));

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está segur(a)?</AlertDialogTitle>
          <AlertDialogDescription>Confirmar acción</AlertDialogDescription>
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
