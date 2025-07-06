import { Ellipsis } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useUsers, useAssistants } from '@/hooks';
import { useAssistantStore } from '@/store';

export const UsersDropdown = ({ row }) => {
  const { assignRoleMutation, toggleStatusMutation } = useUsers();
  const { assisgnAssistantMutation } = useAssistants();
  const { setDialogOpen, setMedicId } = useAssistantStore();

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

  const handleAssignAssistant = () => {
    setDialogOpen(true);
    setMedicId(row.original.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={role === 'admin'} variant='ghost' className='h-8 w-8 p-0'>
          <Ellipsis size={24} className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            disabled={role !== 'user'}
            className={role !== 'user' ? 'opacity-50' : ''}
          >
            Rol
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={role} onValueChange={handleRoleChange}>
                <DropdownMenuRadioItem className='cursor-pointer' value='medic'>
                  Médico
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className='cursor-pointer' value='assistant'>
                  Asistente
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            disabled={status === 'pending'}
            className={status === 'pending' ? 'opacity-50' : ''}
          >
            Estado
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={status} onValueChange={handleToggleStatus}>
                <DropdownMenuRadioItem className='cursor-pointer' value={'active'}>
                  Activo
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className='cursor-pointer' value={'inactive'}>
                  Inactivo
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={role !== 'medic' || status === 'inactive'}
            className='cursor-pointer'
            onSelect={handleAssignAssistant}
          >
            Asistentes
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
