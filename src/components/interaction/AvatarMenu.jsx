import { useLocation, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SignOut, User } from '@phosphor-icons/react';

export const AvatarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCompleteInfo = location.pathname === '/complete-info';
  const isAdmin = sessionStorage.getItem('roles').includes('admin');

  const handleSignOut = () => {
    // Remove sessionStorage items
    sessionStorage.clear();

    // Redirects to the login page
    navigate('/login');
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
          className={isAdmin || isCompleteInfo ? 'hidden' : 'cursor-pointer'}
        >
          <User size={24} className='me-1' />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={handleSignOut} className='cursor-pointer'>
          <SignOut size={24} className='me-1' />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
