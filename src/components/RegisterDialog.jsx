import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const RegisterDialog = () => {
  return (
    <div className='mx-auto'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='text-lg w-auto h-14 mx-auto bg-green-600 hover:bg-green-500'>
            Crear nueva cuenta
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Registrarse</DialogTitle>
            <DialogDescription>Por favor, llene sus datos.</DialogDescription>
          </DialogHeader>
          {/* <RegisterForm /> */}
          <DialogFooter className='sm:justify-start'>
            <Button type='submit'>Registrarse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
