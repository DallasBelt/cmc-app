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
  House,
  Pill,
  SignOut,
  Stethoscope,
  User,
} from '@phosphor-icons/react';

const NavMenu = ({ onLinkClick }) => {
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
          >
            <NavigationMenuLink>
              <House
                size={24}
                color='#2563eb'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Inicio
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/medics'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <NavigationMenuLink>
              <Stethoscope
                size={24}
                color='#2563eb'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Médicos
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/patients'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <NavigationMenuLink>
              <Pill
                size={24}
                color='#2563eb'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Pacientes
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#2563eb]'>
          <NavLink
            to='/appointments'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-[#2563eb]'
                : ''
            }
            onClick={onLinkClick}
          >
            <NavigationMenuLink>
              <CalendarDots
                size={24}
                color='#2563eb'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Citas
            </NavigationMenuLink>
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
            <NavigationMenuLink>
              <User
                size={24}
                color='#2563eb'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Perfil
            </NavigationMenuLink>
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
