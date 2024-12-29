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

import { deleteAppointments } from '@/api/fetchAppointments';
import { useAppointmentStore } from '@/store/useAppointmentStore';

export const DeleteAppointmentDialog = () => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('roles');

  const { handleDeleteAppointment } = deleteAppointments(role, token);

  const { deleteDialogOpen } = useAppointmentStore((state) => ({
    deleteDialogOpen: state.deleteDialogOpen,
  }));
  const { setDeleteDialogOpen } = useAppointmentStore((state) => ({
    setDeleteDialogOpen: state.setDeleteDialogOpen,
  }));

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent
        className='max-w-xl max-h-[80%] overflow-y-auto'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está segur(a)?</AlertDialogTitle>
          <AlertDialogDescription>Confirmar acción</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, volver</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className='bg-red-600 text-white hover:bg-red-500'
          >
            <Button onClick={() => handleDeleteAppointment(appointmentId)}>
              Sí, borrar
              {/* {isSubmitting && (
                <span className='ms-2'>
                  <RotatingLines
                    visible={true}
                    height='20'
                    width='20'
                    strokeColor='#FFF'
                    strokeWidth={5}
                    animationDuration='0.75'
                    ariaLabel='rotating-lines-loading'
                  />
                </span>
              )} */}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
