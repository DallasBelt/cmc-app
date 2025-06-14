import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui';

import { UsersDropdown } from '@/components/users';

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
    accessorKey: 'role',
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
      const role = row.original.role;
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
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      return (
        <>
          <UsersDropdown row={row} />
        </>
      );
    },
  },
];
