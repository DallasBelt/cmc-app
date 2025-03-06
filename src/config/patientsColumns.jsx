import { differenceInYears } from 'date-fns';
import { ArrowDownUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { PatientsDropdown } from '@/components';

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
      return (
        <>
          <PatientsDropdown row={row} />
        </>
      );
    },
  },
];
