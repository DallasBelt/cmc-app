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

import { appointmentStore } from '@/store/appointmentStore';

export const EditAppointmentDialog = () => {
  const { editDialogOpen } = appointmentStore((state) => ({
    editDialogOpen: state.editDialogOpen,
  }));
  const { setEditDialogOpen } = appointmentStore((state) => ({
    setEditDialogOpen: state.setEditDialogOpen,
  }));

  return (
    <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Cita</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to edit this appointment?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
