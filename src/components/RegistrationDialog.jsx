import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import RegistrationForm from './RegistrationForm';

const RegistrationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-green-500 hover:bg-green-400 w-3/4 mx-auto h-12 text-xl'>
          CREAR CUENTA
        </Button>
      </DialogTrigger>
      <DialogContent
        className='max-w-md max-h-screen overflow-y-auto select-none'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-xl'>Registrarse</DialogTitle>
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
