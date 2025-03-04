import { toast } from 'sonner';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { UsersDropdown } from '@/components';

const changeState = async (email) => {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: `Error de autenticación.`,
      });
      return;
    }

    // Send the request to the server
    const res = await fetch('http://localhost:3000/api/v1/auth/soft-delete', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    // Check if the request was successful and the response contains success
    if (!res.ok) {
      toast.error('Oops...', {
        description: 'Error al cambiar el estado.',
      });
      return;
    }

    // Give a toast message if succeeded
    toast.success('¡Enhorabuena!', {
      description: `Se ha cambiado el estado del usuario.`,
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
          <ArrowUpDown size={24} className='ml-2 h-4 w-4' />
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
          <ArrowUpDown size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (row.original.isActive ? 'Activo' : 'Inactivo'),
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
          <ArrowUpDown size={24} className='ml-2 h-4 w-4' />
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
    id: 'actions',
    cell: ({ row }) => {
      return (
        <>
          <UsersDropdown row={row} />
        </>
      );
    },
  },
];
