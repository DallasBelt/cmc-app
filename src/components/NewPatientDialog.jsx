import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { UserPlus } from '@phosphor-icons/react';

import NewPatientForm from './NewPatientForm';
import { useNewPatientModalStore } from '@/store/store';

const NewPatientDialog = () => {
  const modalState = useNewPatientModalStore((state) => state.modalState);
  const setModalState = useNewPatientModalStore((state) => state.setModalState);

  return (
    <>
      <Button
        onClick={() => setModalState(true)}
        className='w-full md:max-w-fit'
      >
        <UserPlus size={24} className='mr-2' />
        Nuevo paciente
      </Button>

      <Dialog open={modalState} onOpenChange={setModalState}>
        <DialogContent
          className='max-w-md max-h-screen overflow-y-auto'
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-xl'>Crear nuevo paciente</DialogTitle>
            <DialogDescription>
              Por favor, llene los datos solicitados.
            </DialogDescription>
          </DialogHeader>
          <NewPatientForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewPatientDialog;
