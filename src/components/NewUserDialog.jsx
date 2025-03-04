import { UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { RegistrationForm } from '@/components';

const NewUserDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <UserPlus2 size={24} className='mr-2' />
            Nuevo usuario
          </Button>
        </DialogTrigger>
        <DialogContent
          className='max-w-md max-h-screen overflow-y-auto'
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-xl'>Crear nuevo usuario</DialogTitle>
            <DialogDescription>
              Por favor, llene los datos solicitados.
            </DialogDescription>
          </DialogHeader>
          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewUserDialog;
