import { useEffect, useState } from 'react';
import axios from 'axios';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

import { toast } from 'sonner';

import { ArrowsDownUp, Trash, UserSwitch } from '@phosphor-icons/react';

const changeRole = async (email, role) => {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: `Error de autenticación.`,
      });
    }

    // Send the request to the server
    const res = await axios.patch(
      'https://cmc-api-42qy.onrender.com/api/v1/auth/change-role',
      { email, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Give a toast message if failed
    if (!res.data.success) {
      toast.error('Oops...', {
        description: 'Error al cambiar el rol.',
      });
    }

    // Give a toast message if succeeded
    toast.success('¡Enhorabuena!', {
      description: `Se ha cambiado el rol del usuario.`,
    });
  } catch (error) {
    console.error(error);
    // Give a toast message if error
    toast.error('Oops...', {
      description: `Ha ocurrido un error.`,
    });
  }
};

const changeState = async (email) => {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: `Error de autenticación.`,
      });
    }

    // Send the request to the server
    const res = await axios.delete(
      'https://cmc-api-42qy.onrender.com/api/v1/auth/',
      { headers: { Authorization: `Bearer ${token}` }, body: email }
    );

    // Give a toast message if failed
    if (!res.data.success) {
      toast.error('Oops...', {
        description: 'Error al cambiar el rol.',
      });
    }

    // Give a toast message if succeeded
    toast.success('¡Enhorabuena!', {
      description: `Se ha eliminado el usuario.`,
    });
  } catch (error) {
    console.error(error);
    // Give a toast message if error
    toast.error('Oops...', {
      description: `Ha ocurrido un error.`,
    });
  }
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
    cell: ({ row }) => {
      return row.original.email;
    },
  },
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
      const [statusToggle, setStatusToggle] = useState(row.original.isActive);
      return (
        <Switch
          disabled={row.original.roles.toString() === 'admin'}
          checked={statusToggle}
          onCheckedChange={() => {
            setStatusToggle(!statusToggle);
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
    cell: ({ row }) => {
      const [role, setRole] = useState('');
      const email = row.original.email;

      return (
        <>
          {/* Switch role button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={row.original.roles.toString() === 'admin'}
                variant='ghost'
                className='h-8 w-8 p-0'
              >
                <UserSwitch size={24} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-5'>
              <RadioGroup
                defaultValue={
                  row.original.roles.toString() === 'assistant'
                    ? 'medic'
                    : row.original.roles.toString() === 'medic'
                    ? 'assistant'
                    : ''
                }
                onValueChange={(value) => setRole(value)}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='medic'
                    id='medic'
                    disabled={row.original.roles.toString() === 'medic'}
                  />
                  <Label htmlFor='medic'>Médico</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='assistant'
                    id='assistant'
                    disabled={row.original.roles.toString() === 'assistant'}
                  />
                  <Label htmlFor='assistant'>Asistente</Label>
                </div>
                <Button
                  id='changeRole'
                  onClick={() => {
                    changeRole(email, role);
                  }}
                >
                  Cambiar rol
                </Button>
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={() => deleteUser(row.original.email)}
                disabled={row.original.roles.toString() === 'admin'}
                variant='ghost'
                className='h-8 w-8 p-0'
              >
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
                <AlertDialogAction
                  onClick={() => deleteUser()}
                  className='bg-red-600 hover:bg-red-500'
                >
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
