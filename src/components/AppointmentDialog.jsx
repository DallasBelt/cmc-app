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

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
  );
};
