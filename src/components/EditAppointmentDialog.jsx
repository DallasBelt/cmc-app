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

import { useAppointmentStore } from '@/store/useAppointmentStore';

export const EditAppointmentDialog = () => {
  const { editDialogOpen } = useAppointmentStore((state) => ({
    editDialogOpen: state.editDialogOpen,
  }));
  const { setEditDialogOpen } = useAppointmentStore((state) => ({
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
