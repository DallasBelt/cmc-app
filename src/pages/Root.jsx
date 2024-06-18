import { Outlet, Link, NavLink } from 'react-router-dom';
import { User, SignOut } from '@phosphor-icons/react';

import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

const Root = () => {
  return (
    <>
      <div className='flex justify-between bg-slate-100 mb-5 px-20 py-3 shadow-md'>
        <Link to='/'>
          <img src={logo} className='w-32' />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className='gap-10'>
            <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700'>
              <NavLink
                to='/medics'
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-4 decoration-2 decoration-blue-700'
                    : ''
                }
              >
                <NavigationMenuLink>Médicos</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700'>
              <NavLink
                to='/patients'
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-4 decoration-2 decoration-blue-700'
                    : ''
                }
              >
                <NavigationMenuLink>Pacientes</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700'>
              <NavLink
                to='/appointments'
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-4 decoration-2 decoration-blue-700'
                    : ''
                }
              >
                <NavigationMenuLink>Citas</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700'>
              <NavigationMenuLink>Estadísticas</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuIndicator />
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
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
