import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui';

import { UsersDropdown } from '@/components/users';

export const usersColumns = [
  {
    accessorKey: 'email',
    header: 'Correo electrónico',
    cell: ({ row }) => {
      return row.original.email;
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case 'pending':
          return 'Pendiente';
        case 'active':
          return 'Activo';
        case 'inactive':
          return 'Inactivo';
        default:
          return '-';
      }
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const role = row.original.role;
      switch (role) {
        case 'admin':
          return 'Administrador';
        case 'user':
          return 'Sin asignar';
        case 'medic':
          return 'Médico';
        case 'assistant':
          return 'Asistente';
        default:
          return '-';
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
