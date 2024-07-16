import { NavLink, useLocation } from 'react-router-dom';

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
  Stethoscope,
  User,
  Users,
} from '@phosphor-icons/react';

// const role = localStorage.getItem('role');
const role = 'admin';

const NavMenu = ({ onLinkClick }) => {
  return (
    <NavigationMenu className='flex'>
      <NavigationMenuList className='flex flex-col items-start gap-5 md:flex-row'>
        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb] ms-1'>
          <NavLink
            to='/super'
            className={({ isActive }) =>
              isActive && location.pathname === '/super'
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
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

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/super/users'
            className={({ isActive }) =>
              isActive && location.pathname === '/super/users'
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
          className={({ isActive }) =>
            isActive && location.pathname === '/super/medics'
              ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
              : ''
          }
        >
          <NavLink
            to='/super/medics'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <Stethoscope
              size={24}
              color='#2563eb'
              weight='fill'
              className='me-2 inline md:hidden'
            />
            Médicos
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/super/assistants'
            className={({ isActive }) =>
              isActive && location.pathname === '/super/assistants'
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

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/super/patients'
            className={({ isActive }) =>
              isActive && location.pathname === '/super/patients'
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

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/super/appointments'
            className={({ isActive }) =>
              isActive && location.pathname === '/super/appointments'
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
