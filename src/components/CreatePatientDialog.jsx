import { UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreatePatientForm } from '@/components';
import { usePatientStore } from '@/store';

export const CreatePatientDialog = () => {
  const createPatientDialog = usePatientStore(
    (state) => state.createPatientDialog
  );
  const setCreatePatientDialog = usePatientStore(
    (state) => state.setCreatePatientDialog
  );
  const setEditPatient = usePatientStore((state) => state.setEditPatient);

  return (
    <>
      <Button
        onClick={() => {
          setCreatePatientDialog(true);
          setEditPatient(false);
        }}
        className='w-full md:max-w-fit'
      >
        <UserPlus2 size={24} className='mr-2' />
        Nuevo paciente
      </Button>

      <Dialog open={createPatientDialog} onOpenChange={setCreatePatientDialog}>
        <DialogContent
          className='max-w-xl max-h-[80%] overflow-y-auto'
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
          <CreatePatientForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
