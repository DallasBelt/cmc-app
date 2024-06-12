import { Link } from 'react-router-dom';
import { User, SignOut } from '@phosphor-icons/react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import logo from '@/assets/logo.svg';

const NavBar = () => {
  return (
    <nav className='flex justify-between bg-slate-100 mb-5 px-20 py-3 shadow-md'>
      <Link to='/'>
        <img src={logo} className='w-32' />
      </Link>

      <NavigationMenu>
        <NavigationMenuList className='gap-5'>
          <NavigationMenuItem className='hover:underline hover:decoration-2 hover:decoration-blue-700'>
            <Link to='/medics'>
              <NavigationMenuLink>Médicos</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className='hover:underline hover:decoration-2 hover:decoration-blue-700'>
            <Link to='/patients'>
              <NavigationMenuLink>Pacientes</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className='hover:underline hover:decoration-2 hover:decoration-blue-700'>
            <Link to='/appointments'>
              <NavigationMenuLink>Citas</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem className='hover:underline hover:decoration-2 hover:decoration-blue-700'>
            <NavigationMenuLink>Estadísticas</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>Usuario</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User size={24} className='me-1' />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut size={24} className='me-1' />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavBar;
