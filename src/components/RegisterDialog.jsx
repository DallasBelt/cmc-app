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

import RegisterForm from './RegisterForm';

const RegisterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus size={24} className='me-1' />
          Agregar Médico
        </Button>
      </DialogTrigger>
      <DialogContent className='md:max-w-3xl'>
        <ScrollArea className='max-h-[80vh]'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Crear nuevo médico</DialogTitle>
            <DialogDescription>
              Por favor, llene los datos solicitados.
            </DialogDescription>
          </DialogHeader>
          <RegisterForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
