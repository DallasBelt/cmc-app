import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

import { AppointmentForm } from '@/components/appointments';

import { useAppointmentStore } from '@/store';

export const AppointmentDialog = () => {
  const {
    createAppointmentDialog,
    editAppointment,
    setCreateAppointmentDialog,
    setEditAppointment,
  } = useAppointmentStore();

  return (
    <Dialog
      open={createAppointmentDialog}
      onOpenChange={(open) => {
        setCreateAppointmentDialog(open);
        if (!open) setEditAppointment(false);
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
          <DialogTitle>{editAppointment ? 'Editar' : 'Crear'} cita</DialogTitle>
        </DialogHeader>
        <AppointmentForm />
      </DialogContent>
    </Dialog>
  );
};
