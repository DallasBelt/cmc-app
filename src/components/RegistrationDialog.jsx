import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { UserPlus } from '@phosphor-icons/react';

import RegistrationForm from './RegistrationForm';
import { useRegistrationStore } from '@/store/store';

const RegistrationDialog = () => {
  // Retrieve the token
  const token = sessionStorage.getItem('token');

  // Control modal global state
  const modalState = useRegistrationStore((state) => state.modalState);
  const setModalState = useRegistrationStore((state) => state.setModalState);

  return (
    <>
      <Button
        onClick={() => setModalState(true)}
        className={
          !token ? 'bg-green-500 hover:bg-green-400 mx-auto h-12 text-xl' : ''
        }
      >
        <UserPlus size={24} className={!token ? 'hidden' : 'mr-2'} />
        {!token ? 'REGISTRARSE' : 'Nuevo'}
      </Button>

      <Dialog open={modalState} onOpenChange={setModalState}>
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

export default RegistrationDialog;
