import { Link, Outlet } from 'react-router-dom';

import NavMenu from '@/components/NavMenu';
import AvatarMenu from '@/components/AvatarMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { List } from '@phosphor-icons/react';

import logo from '@/assets/logo.svg';

const Root = () => {
  return (
    <>
      <div className='flex items-center justify-between h-20 mb-5 px-5 py-3 bg-slate-100 shadow-md md:px-20'>
        <Link to='/'>
          <img src={logo} className='w-16 md:block md:w-32 md:mb-0' />
        </Link>

        <Sheet>
          <SheetTrigger className='md:hidden'>
            <List size={24} color='#2563eb' />
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader className='mb-5'>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <NavMenu />
          </SheetContent>
        </Sheet>

        <div className='hidden md:block'>
          <NavMenu />
        </div>

        <div className='hidden md:block'>
          <AvatarMenu />
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
