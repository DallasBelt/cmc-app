import { differenceInYears } from 'date-fns';
import {
  Loader2,
  ArrowDownUp,
  ClipboardList,
  Ellipsis,
  Pencil,
  Trash,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { usePatients } from '@/hooks';
import { usePatientStore } from '@/store';
import { CreatePatientForm } from '@/components';

export const patientsColumns = [
  {
    accessorKey: 'dni',
    header: 'Nº Documento',
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Apellido
          <ArrowDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Nº Celular',
  },
  {
    accessorKey: 'dob',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Edad
          <ArrowDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const birthDate = new Date(row.original.dob);
      const age = differenceInYears(new Date(), birthDate);
      return age;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const setEditPatient = usePatientStore((state) => state.setEditPatient);
      const setPatientId = usePatientStore((state) => state.setPatientId);

      const isAssistant = sessionStorage.getItem('roles').includes('assistant');

      const { deletePatientMutation } = usePatients();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <Ellipsis size={24} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='flex flex-col'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              {isAssistant ? (
                ''
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <ClipboardList size={16} className='me-2' />
                      Ver historial
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Historial clínico</DialogTitle>
                      <DialogDescription>Description.</DialogDescription>
                    </DialogHeader>
                    {/* todo: historial clínico modal content */}
                  </DialogContent>
                </Dialog>
              )}

              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setEditMode(true);
                      setPatientId(row.original.id);
                    }}
                  >
                    <Pencil size={16} className='me-2' /> Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent
                  className='max-w-xl max-h-[80%] overflow-y-auto'
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                >
                  <DialogHeader>
                    <DialogTitle>Editar información del paciente</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <CreatePatientForm />
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      // setEditMode(true);
                      setPatientId(row.original.id);
                    }}
                  >
                    <Trash size={16} className='me-2' /> Borrar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent
                  className='max-w-xl max-h-[80%] overflow-y-auto'
                  onInteractOutside={(e) => {
                    e.preventDefault();
                  }}
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Está absolutamente seguro?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      asChild
                      className='bg-red-600 text-white hover:bg-red-500'
                    >
                      <Button
                        onClick={() =>
                          deletePatientMutation.mutate(row.original.id)
                        }
                      >
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
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
