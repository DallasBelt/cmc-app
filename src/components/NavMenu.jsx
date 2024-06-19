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

const NavMenu = () => {
  return (
    <NavigationMenu className='flex'>
      <NavigationMenuList className='flex flex-col items-start gap-5 md:flex-row'>
        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700 ms-1'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-blue-700'
                : ''
            }
          >
            <NavigationMenuLink>
              <House
                size={24}
                color='#1a5fb4'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Inicio
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700'>
          <NavLink
            to='/medics'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-blue-700'
                : ''
            }
          >
            <NavigationMenuLink>
              <Stethoscope
                size={24}
                color='#1a5fb4'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Médicos
            </NavigationMenuLink>
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
            <NavigationMenuLink>
              <Pill
                size={24}
                color='#1a5fb4'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Pacientes
            </NavigationMenuLink>
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
            <NavigationMenuLink>
              <CalendarDots
                size={24}
                color='#1a5fb4'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Citas
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <Separator className='block md:hidden' />

        <NavigationMenuItem className='block md:hidden hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700'>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive
                ? 'underline underline-offset-4 decoration-2 decoration-blue-700'
                : ''
            }
          >
            <NavigationMenuLink>
              <User
                size={24}
                color='#1a5fb4'
                weight='fill'
                className='me-2 inline md:hidden'
              />
              Perfil
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='block md:hidden hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-700 cursor-pointer'>
          <NavigationMenuLink>
            <SignOut
              size={24}
              color='#1a5fb4'
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
