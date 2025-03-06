import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreatePatientForm } from '@/components';

export const EditPatientDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Editar información del paciente</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <CreatePatientForm />
      </DialogContent>
    </Dialog>
  );
};
