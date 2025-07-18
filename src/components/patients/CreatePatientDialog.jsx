import { UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

import { CreatePatientForm } from '@/components/patients';
import { usePatientStore } from '@/store';

export const CreatePatientDialog = () => {
  const createPatientDialog = usePatientStore((state) => state.createPatientDialog);
  const setCreatePatientDialog = usePatientStore((state) => state.setCreatePatientDialog);
  const setIsEditingPatient = usePatientStore((state) => state.setIsEditingPatient);

  return (
    <>
      <Button
        onClick={() => {
          setCreatePatientDialog(true);
          setIsEditingPatient(false);
        }}
        className='w-full md:max-w-fit'
      >
        <UserPlus2 />
        Crear paciente
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
            <DialogDescription>Por favor, llene los datos solicitados.</DialogDescription>
          </DialogHeader>
          <CreatePatientForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
