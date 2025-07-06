import { UserPlus2 } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/';

import { cn } from '@/lib/utils';

import { RegistrationForm } from '@/components/auth';
import { useAuthStore } from '@/store';
import { useRegistrationStore } from '@/store';

export const RegistrationDialog = () => {
  // Retrieve the token
  const token = sessionStorage.getItem('token');

  const { isLoggingIn } = useAuthStore();

  // Control modal global state
  const registrationDialog = useRegistrationStore((state) => state.registrationDialog);
  const setRegistrationDialog = useRegistrationStore((state) => state.setRegistrationDialog);

  return (
    <>
      <Button
        disabled={isLoggingIn}
        className={!token && 'bg-green-500 hover:bg-green-400 mx-auto h-12 text-xl'}
        onClick={() => setRegistrationDialog(true)}
      >
        <UserPlus2 size={24} className={!token ? 'hidden' : 'mr-2'} />
        {!token ? 'REGISTRARSE' : 'Nuevo'}
      </Button>

      <Dialog open={registrationDialog} onOpenChange={setRegistrationDialog}>
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
            <DialogDescription>Por favor, llene los datos solicitados.</DialogDescription>
          </DialogHeader>
          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
