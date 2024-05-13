import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import RegisterForm from './RegisterForm';

const RegisterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-lg h-14 mx-auto bg-green-600 hover:bg-green-500'>
          Crear nueva cuenta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-3xl'>Registrarse</DialogTitle>
          <DialogDescription>Por favor, llene sus datos.</DialogDescription>
        </DialogHeader>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
