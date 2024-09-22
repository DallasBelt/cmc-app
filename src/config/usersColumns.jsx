import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

import {
  ArrowUpDown,
  Ellipsis,
  UserRoundCheck,
  UserRoundCog,
} from 'lucide-react';

const changeRole = async (email, role) => {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: 'Error de autenticación.',
      });
      return;
    }

    // Send the request to the server
    const res = await fetch('http://localhost:3000/api/v1/auth/change-role', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, role }),
    });

    // Check if the request was successful
    if (!res.ok) {
      toast.error('Oops...', {
        description: 'Error al cambiar el rol.',
      });
      return;
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
      const [role, setRole] = useState('');
      const email = row.original.email;

      const [changeRoleModal, setChangeRoleModal] = useState(false);
      const [changeStateModal, setChangeStateModal] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={row.original.roles.toString() === 'admin'}
                variant='ghost'
                className='h-8 w-8 p-0'
              >
                <Ellipsis size={24} className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='flex flex-col'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <Dialog open={changeRoleModal} onOpenChange={setChangeRoleModal}>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setChangeRoleModal(true);
                  }}
                  className='cursor-pointer'
                >
                  <UserRoundCog size={16} className='mr-2' />
                  Cambiar rol
                </DropdownMenuItem>
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
                      onClick={() => {
                        changeRole(email, role);
                        setChangeRoleModal(false);
                      }}
                    >
                      Guardar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={changeStateModal}
                onOpenChange={setChangeStateModal}
              >
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setChangeStateModal(true);
                  }}
                  className='cursor-pointer'
                >
                  <UserRoundCheck size={16} className='mr-2' />
                  Cambiar estado
                </DropdownMenuItem>
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
                      onClick={() => {
                        changeState(email);
                        setChangeStateModal(false);
                      }}
                    >
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
