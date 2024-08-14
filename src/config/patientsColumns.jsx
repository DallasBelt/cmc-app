import { useState } from 'react';
import axios from 'axios';
import { differenceInYears, format } from 'date-fns';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { toast } from 'sonner';

import { ArrowsDownUp, DotsThree, FloppyDisk } from '@phosphor-icons/react';

export const patientsColumns = [
  {
    accessorKey: 'dni',
    header: 'Nº Documento',
    // cell: ({ row }) => {
    //   return row.original.dni;
    // },
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
      const [role, setRole] = useState('');
      const email = row.original.email;

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
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Ver información
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Información del paciente</DialogTitle>
                    <DialogDescription>Description.</DialogDescription>
                  </DialogHeader>
                  <RadioGroup onValueChange={(value) => setRole(value)}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='active'
                        id='active'
                        disabled={row.original.isActive === true}
                      />
                      <Label htmlFor='active'>Activo</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='inactive'
                        id='inactive'
                        disabled={row.original.isActive === false}
                      />
                      <Label htmlFor='inactive'>Inactivo</Label>
                    </div>
                  </RadioGroup>
                  <div className='flex justify-end'>
                    <Button
                      className='w-fit'
                      onClick={() => changeState(email)}
                    >
                      <FloppyDisk size={24} className='mr-2' />
                      Guardar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
