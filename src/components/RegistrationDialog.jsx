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

import RegistrationForm from './RegistrationForm';

const RegistrationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-green-500 hover:bg-green-400 w-2/4 mx-auto h-12 text-xl'>
          CREAR CUENTA
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <ScrollArea className='max-h-[80vh]'>
          <DialogHeader className='mb-5'>
            <DialogTitle className='text-xl'>Registrarse</DialogTitle>
            <DialogDescription>
              Por favor, llene los datos solicitados.
            </DialogDescription>
          </DialogHeader>
          <RegistrationForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
