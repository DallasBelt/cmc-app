import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/';

import { UpdatePasswordForm } from '@/components/auth';
import { useAuthStore } from '@/store';

export const UpdatePasswordDialog = () => {
  const { updatePasswordDialogOpen, setUpdatePasswordDialogOpen } =
    useAuthStore((state) => state);

  return (
    <>
      <Dialog
        open={updatePasswordDialogOpen}
        onOpenChange={setUpdatePasswordDialogOpen}
      >
        <DialogContent
          className='max-w-md max-h-screen overflow-y-auto select-none'
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-xl'>Actualizar contraseña</DialogTitle>
            <DialogDescription>
              Por favor, llene los datos solicitados.
            </DialogDescription>
          </DialogHeader>
          <UpdatePasswordForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
