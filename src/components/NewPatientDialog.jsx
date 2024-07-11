import { useState } from 'react';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { UserPlus } from '@phosphor-icons/react';

import NewPatientForm from './NewPatientForm';

const NewPatientDialog = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UserPlus size={24} className='mr-2' />
            Nuevo paciente
          </Button>
        </DialogTrigger>
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
