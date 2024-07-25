import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { UserPlus } from '@phosphor-icons/react';

import RegistrationForm from './RegistrationForm';

const RegistrationDialog = () => {
  // Retrieve the token
  const token = sessionStorage.getItem('token');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            !token ? 'bg-green-500 hover:bg-green-400 mx-auto h-12 text-xl' : ''
          }
        >
          <UserPlus size={24} className={!token ? 'hidden' : 'mr-2'} />
          {!token ? 'REGISTRARSE' : 'Nuevo'}
        </Button>
      </DialogTrigger>
      <DialogContent
        className='max-w-md max-h-screen overflow-y-auto select-none'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-xl'>
            {!token ? 'Registrarse' : 'Crear nuevo usuario'}
          </DialogTitle>
          <DialogDescription>
            Por favor, llene los datos solicitados.
          </DialogDescription>
        </DialogHeader>
        <RegistrationForm />
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
