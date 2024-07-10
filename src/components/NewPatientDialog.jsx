import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { UserPlus } from '@phosphor-icons/react';

import NewPatientForm from './NewPatientForm';

const NewPatientDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus size={24} className='mr-2' />
          Crear paciente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className='max-h-[80vh]'>
          <DialogHeader className='mb-5'>
            <DialogTitle className='text-xl'>Crear nuevo paciente</DialogTitle>
            <DialogDescription>
              Por favor, llene los datos solicitados.
            </DialogDescription>
          </DialogHeader>
          <NewPatientForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewPatientDialog;
