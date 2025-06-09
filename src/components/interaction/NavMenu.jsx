import { NavLink, useNavigate } from 'react-router-dom';
import { CalendarDays, House, LogOut, Pill, User2, Users2 } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';

export const NavMenu = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('role') === 'admin';

  const handleSignOut = () => {
    // Remove sessionStorage elements
    sessionStorage.clear();

    // Redirects to the login page
    navigate('/login');
  };

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
            <House size={24} className='me-2 inline md:hidden' />
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
            <Users2 size={24} className='me-2 inline md:hidden' />
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
            <Pill size={24} className='me-2 inline md:hidden' />
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
            <CalendarDays size={24} className='me-2 inline md:hidden' />
            Citas
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/stats'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <CalendarDays size={24} className='me-2 inline md:hidden' />
            Estadísticas
          </NavLink>
        </NavigationMenuItem>

        <Separator className='block md:hidden' />

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb] md:hidden'>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <User2 size={24} className='me-2 inline md:hidden' />
            Perfil
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb] cursor-pointer md:hidden'>
          <NavigationMenuLink onSelect={handleSignOut}>
            <LogOut size={24} className='me-2 inline md:hidden' />
            Salir
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuIndicator />
    </NavigationMenu>
  );
};
