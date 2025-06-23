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
  const { assignRoleMutation, toggleStatusMutation } = useUsers();

  const email = row.original.email;
  const status = row.original.status;
  const role = row.original.role;

  const handleRoleChange = (newRole) => {
    if (newRole === role) {
      toast.error('El usuario ya tiene ese rol.');
      return;
    }
    assignRoleMutation.mutate({ email, role: newRole });
  };

  const handleToggleStatus = (newStatus) => {
    if (newStatus === status) {
      toast.error('El usuario ya tiene ese estado.');
      return;
    }
    toggleStatusMutation.mutate(email);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={row.original.role === 'admin'}
          variant='ghost'
          className='h-8 w-8 p-0'
        >
          <Ellipsis size={24} className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <div className={role !== 'user' ? 'hidden' : 'block'}>
          <DropdownMenuLabel>Asignar rol y activar</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={role} onValueChange={handleRoleChange}>
            <DropdownMenuRadioItem className='cursor-pointer' value='medic'>
              Médico
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem className='cursor-pointer' value='assistant'>
              Asistente
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>

        <div className={status !== 'pending' ? 'block' : 'hidden'}>
          <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={handleToggleStatus}
          >
            <DropdownMenuRadioItem className='cursor-pointer' value={'active'}>
              Activo
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              className='cursor-pointer'
              value={'inactive'}
            >
              Inactivo
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
