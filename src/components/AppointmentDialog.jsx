import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import AppointmentForm from '@/components/AppointmentForm';

import { useAppointmentStore } from '@/store';

export const AppointmentDialog = () => {
  const createAppointmentDialog = useAppointmentStore(
    (state) => state.createAppointmentDialog
  );
  const setCreateAppointmentDialog = useAppointmentStore(
    (state) => state.setCreateAppointmentDialog
  );
  const editAppointment = useAppointmentStore((state) => state.editAppointment);
  const setEditAppointment = useAppointmentStore(
    (state) => state.setEditAppointment
  );

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
