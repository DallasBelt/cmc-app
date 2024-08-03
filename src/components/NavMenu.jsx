import { NavLink } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';

import {
  CalendarDots,
  HandPalm,
  House,
  Pill,
  SignOut,
  User,
  Users,
} from '@phosphor-icons/react';

const NavMenu = ({ onLinkClick }) => {
  const roles = sessionStorage.getItem('roles');
  const isAdmin = roles && roles.includes('admin');

  return (
    <NavigationMenu className='flex'>
      <NavigationMenuList className='flex flex-col items-start gap-5 md:flex-row'>
        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb] ms-1'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
            end
          >
            <House
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Inicio
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={
            isAdmin
              ? 'hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'
              : 'hidden'
          }
        >
          <NavLink
            to='/users'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <Users
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Usuarios
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={
            isAdmin
              ? 'hidden'
              : 'hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'
          }
        >
          <NavLink
            to='/patients'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <Pill
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Pacientes
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={
            isAdmin
              ? 'hidden'
              : 'hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'
          }
        >
          <NavLink
            to='/appointments'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <CalendarDots
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Citas
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={
            isAdmin
              ? 'hidden'
              : 'hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'
          }
        >
          <NavLink
            to='/assistants'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <HandPalm
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Asistentes
          </NavLink>
        </NavigationMenuItem>

        <Separator className='block md:hidden' />

        <NavigationMenuItem className='block md:hidden hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <User
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Perfil
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='block md:hidden hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb] cursor-pointer'>
          <NavigationMenuLink>
            <SignOut
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Cerrar sesión
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuIndicator />
    </NavigationMenu>
  );
};

export default NavMenu;
