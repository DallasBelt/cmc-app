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
  const state = row.original.isActive;
  const role = row.original.roles.toString();

  const handleRoleChange = (newRole) => {
    if (newRole === role) {
      toast.error('El usuario ya tiene ese rol.');
      return;
    }
    changeRoleMutation.mutate({ email, role: newRole });
  };

  const handleStateChange = (newState) => {
    if (newState === state) {
      toast.error('El usuario ya tiene ese estado.');
      return;
    }
    changeStateMutation.mutate(email);
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
        <div className={state ? 'block' : 'hidden'}>
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
        </div>

        <DropdownMenuLabel>Cambiar Estado</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={state} onValueChange={handleStateChange}>
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
