import { useState } from 'react';
import axios from 'axios';

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

export const medicsColumns = [
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
    // cell: ({ row }) => {
    //   return row.original.email;
    // },
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
    // cell: ({ row }) => {
    //   return row.original.email;
    // },
  },
  {
    accessorKey: 'specialty',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Especialidad
          <ArrowsDownUp size={24} className='ml-2 h-4 w-4' />
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
    id: 'actions',
    cell: ({ row }) => {
      const [role, setRole] = useState('');
      const email = row.original.email;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={row.original.roles.toString() === 'admin'}
                variant='ghost'
                className='h-8 w-8 p-0'
              >
                <DotsThree size={24} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='flex flex-col'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Cambiar rol
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cambiar rol</DialogTitle>
                    <DialogDescription>
                      Seleccione el nuevo rol para el usuario.
                    </DialogDescription>
                  </DialogHeader>
                  <RadioGroup onValueChange={(value) => setRole(value)}>
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
                  </RadioGroup>
                  <div className='flex justify-end'>
                    <Button
                      className='w-fit'
                      onClick={() => changeRole(email, role)}
                    >
                      <FloppyDisk size={24} className='mr-2' />
                      Guardar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Cambiar estado
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cambiar estado</DialogTitle>
                    <DialogDescription>
                      Seleccione un nuevo estado para el usuario.
                    </DialogDescription>
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