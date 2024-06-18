import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SignOut, User } from '@phosphor-icons/react';

const AvatarMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='hidden md:block'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <User size={24} className='me-1' />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <SignOut size={24} className='me-1' />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
