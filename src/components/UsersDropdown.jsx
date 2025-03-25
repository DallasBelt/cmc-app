import { useState } from 'react';

import { Ellipsis } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useUsers } from '@/hooks';

export const UsersDropdown = ({ row }) => {
  const { changeRoleMutation, changeStateMutation } = useUsers();

  const email = row.original.email;

  const [role, setRole] = useState(row.original.roles.toString());
  const [state, setState] = useState(row.original.isActive);

  const handleRoleChange = (newRole) => {
    if (newRole === role) {
      toast.error('El rol es el mismo.');
      return;
    }
    setRole(newRole);
    changeRoleMutation.mutate({ email, role: newRole });
  };

  return (
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
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cambiar Rol</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={role} onValueChange={handleRoleChange}>
          <DropdownMenuRadioItem className='cursor-pointer' value='medic'>
            Médico
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='cursor-pointer' value='assistant'>
            Asistente
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Cambiar Estado</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={state}
          onValueChange={(state) => {
            setState(state);
            changeStateMutation.mutate(email);
          }}
        >
          <DropdownMenuRadioItem className='cursor-pointer' value={true}>
            Activo
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='cursor-pointer' value={false}>
            Inactivo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
