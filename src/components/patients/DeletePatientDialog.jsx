import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { usePatients } from '@/hooks';

export const DeletePatientDialog = ({ row, open, onOpenChange }) => {
  const { deletePatientMutation } = usePatients();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Se va a eliminar un paciente</AlertDialogTitle>
          <AlertDialogDescription>¿Está seguro(a)?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, cancelar</AlertDialogCancel>
          <AlertDialogAction asChild className='bg-red-600 text-white hover:bg-red-500'>
            <Button onClick={() => deletePatientMutation.mutate(row.original.id)}>
              Sí, borrar
              {deletePatientMutation.isPending && (
                <span className='ms-2'>
                  <Loader2 className='animate-spin' />
                </span>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
