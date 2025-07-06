import { useNavigate } from 'react-router-dom';

import { LogOut, RotateCcwKey, User2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuth } from '@/hooks';
import { useAuthStore } from '@/store';

export const AvatarMenu = () => {
  const navigate = useNavigate();
  const { logoutMutation } = useAuth();
  const isAdmin = sessionStorage.getItem('role') === 'admin';

  const { setUpdatePasswordDialogOpen } = useAuthStore((state) => state);

  const handleUpdatePassword = () => {
    setUpdatePasswordDialogOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='md:block'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onSelect={() => navigate('/profile')}
          className={isAdmin ? 'hidden' : 'cursor-pointer'}
        >
          <User2 size={20} className='me-1' />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={handleUpdatePassword} className='cursor-pointer'>
          <RotateCcwKey size={20} className='me-1' />
          Actualizar contraseña
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => logoutMutation.mutate()} className='cursor-pointer'>
          <LogOut size={20} className='me-1' />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
