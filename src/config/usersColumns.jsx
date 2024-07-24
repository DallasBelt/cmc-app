import { useState } from 'react';
('use client');

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

import { ArrowsDownUp, Trash, UserSwitch } from '@phosphor-icons/react';

const deleteMedic = (id) => {
  console.log('Deleting medic with id:', id);
};

export const usersColumns = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Correo electrónico
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: 'role',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         className='px-0 hover:bg-transparent'
  //         variant='ghost'
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Rol
  //         <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const [status, setStatus] = useState(row.original.isActive);
      return (
        <Switch
          checked={status}
          onCheckedChange={() => {
            setStatus(!status);
          }}
        />
      );
    },
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rol
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.roles
        .map((role) => {
          switch (role) {
            case 'admin':
              return 'Administrador';
            case 'user':
              return 'Usuario';
            case 'medic':
              return 'Médico';
            case 'assistant':
              return 'Asistente';
            default:
              return 'Rol desconocido';
          }
        })
        .join(', ');
    },
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: () => {
      return (
        <>
          {/* Switch role button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <UserSwitch size={24} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-5'>
              <RadioGroup>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='medic' id='medic' />
                  <Label htmlFor='medic'>Médico</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='assistant' id='assistant' />
                  <Label htmlFor='assistant'>Asistente</Label>
                </div>
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <Trash size={24} className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Está seguro de que desea borrar el usuario?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, cancelar</AlertDialogCancel>
                <AlertDialogAction className='bg-red-600 hover:bg-red-500'>
                  Sí, continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
