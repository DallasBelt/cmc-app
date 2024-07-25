import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';

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

import imagotype from '@/assets/imagotype.svg';
import isotypeRoot from '@/assets/isotype-root.svg';

const Root = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <Toaster
        position='bottom-right'
        theme='light'
        richColors
        toastOptions={{}}
        expand
        visibleToasts={1}
      />

      <div className='flex items-center justify-between h-20 px-5 py-3 bg-slate-100 shadow-md md:px-20'>
        <Link to='/'>
          <img src={imagotype} className='w-16 md:hidden' />
          <img src={isotypeRoot} className='hidden md:block md:w-64' />
        </Link>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className='md:hidden'>
            <List size={24} color='#2563eb' weight='bold' />
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader className='mb-5'>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <NavMenu onLinkClick={handleCloseSheet} />
          </SheetContent>
        </Sheet>

        <div className='hidden md:flex md:gap-10'>
          <NavMenu />
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
