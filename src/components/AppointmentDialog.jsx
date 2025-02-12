import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AppointmentForm from '@/components/AppointmentForm';

import { appointmentStore } from '@/store/appointmentStore';

export const AppointmentDialog = () => {
  const dialogOpen = appointmentStore((state) => state.dialogOpen);
  const setDialogOpen = appointmentStore((state) => state.setDialogOpen);
  const editMode = appointmentStore((state) => state.editMode);
  const setEditMode = appointmentStore((state) => state.setEditMode);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) setEditMode(false);
      }}
    >
      <DialogContent
        aria-describedby={undefined}
        className='max-w-md max-h-[80%] overflow-y-auto select-none'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{editMode ? 'Editar' : 'Crear'} cita</DialogTitle>
        </DialogHeader>
        <AppointmentForm />
      </DialogContent>
    </Dialog>
  );
};
