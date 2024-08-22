import { useState } from 'react';
import axios from 'axios';
import { differenceInYears } from 'date-fns';
import { RotatingLines } from 'react-loader-spinner';
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

import {
  ArrowsDownUp,
  ClipboardText,
  DotsThree,
  Pencil,
  Trash,
} from '@phosphor-icons/react';
import NewPatientForm from '@/components/NewPatientForm';

import { useEditModeStore } from '@/store/store';
import { usePatientIdStore } from '@/store/store';

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
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
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
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
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
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
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
      const setEditMode = useEditModeStore((state) => state.setEditMode);
      const setPatientId = usePatientIdStore((state) => state.setPatientId);
      const [isSubmitting, setIsSubmitting] = useState(false);

      const deletePatient = async () => {
        try {
          setIsSubmitting(true);

          // Check auth
          const token = sessionStorage.getItem('token');
          if (!token) {
            toast.error('Oops!', {
              description: 'Error de autenticación.',
            });
            return;
          }

          // Delete request to delete a patient
          const res = await axios.delete(
            `http://localhost:3000/api/v1/patient/${row.original.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.status === 200) {
            toast.success('¡Enhorabuena!', {
              description: 'Paciente borrado con éxito.',
            });
          }
        } catch (error) {
          console.error(error);
          toast.error('Oops...', {
            description: 'Error al borrar el paciente.',
          });
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <DotsThree size={24} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='flex flex-col'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <ClipboardText size={16} className='me-2' />
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
                  <NewPatientForm />
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setEditMode(true);
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
                      <Button onClick={() => deletePatient()}>
                        Sí, borrar
                        {isSubmitting && (
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
