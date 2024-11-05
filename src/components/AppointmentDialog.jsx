import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AppointmentForm from '@/components/AppointmentForm';

import { useAppointmentStore } from '@/store/useAppointmentStore';

export const AppointmentDialog = () => {
  const dialogOpen = useAppointmentStore((state) => state.dialogOpen);
  const setDialogOpen = useAppointmentStore((state) => state.setDialogOpen);

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
