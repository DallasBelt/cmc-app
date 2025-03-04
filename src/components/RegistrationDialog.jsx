import { UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RegistrationForm } from '@/components';
import { useRegistrationStore } from '@/store';

export const RegistrationDialog = () => {
  // Retrieve the token
  const token = sessionStorage.getItem('token');

  // Control modal global state
  const registrationDialog = useRegistrationStore(
    (state) => state.registrationDialog
  );
  const setRegistrationDialog = useRegistrationStore(
    (state) => state.setRegistrationDialog
  );

  return (
    <>
      <Button
        onClick={() => setRegistrationDialog(true)}
        className={
          !token ? 'bg-green-500 hover:bg-green-400 mx-auto h-12 text-xl' : ''
        }
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
