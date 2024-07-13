'use client';

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ArrowsDownUp, DotsThreeVertical } from '@phosphor-icons/react';

export const usersColumns = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent hover:text-slate-200'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Correo electrónico
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'Identificación',
  },
  {
    accessorKey: 'role',
    header: 'Rol',
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent hover:text-slate-200'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombres
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'age',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent hover:text-slate-200'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Edad
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsThreeVertical size={24} weight='bold' className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => true}>
              Cambiar rol
            </DropdownMenuItem>
            <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
            <DropdownMenuItem>Ver detalles...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
