import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import NavMenu from '@/components/NavMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';

import { List } from '@phosphor-icons/react';

import AvatarMenu from '@/components/AvatarMenu';
import navbarLogo from '@/assets/navbar-logo.svg';
import { useTheme } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ModeToggle';

const Root = () => {
  const { effectiveTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <Toaster
        position='bottom-right'
        theme={effectiveTheme}
        richColors
        toastOptions={{}}
        expand={true}
        visibleToasts={3}
      />

      <div className='container mx-auto px-24'>
        <nav className='sticky top-0 flex items-center justify-between gap-5 h-20 backdrop-filter backdrop-blur-lg bg-opacity-30'>
          <Link to='/' className='hidden md:flex'>
            <img src={navbarLogo} className='w-12' />
          </Link>

          <div>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger className='flex md:hidden'>
                <List size={24} weight='bold' />
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetHeader className='mb-5'>
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <NavMenu onLinkClick={handleCloseSheet} />
              </SheetContent>
            </Sheet>
          </div>

          <div className='hidden md:flex md:mr-auto'>
            <NavMenu />
          </div>

          <div className='flex gap-5'>
            <ModeToggle />

            <div className='hidden md:flex'>
              <AvatarMenu />
            </div>
          </div>
        </nav>

        <div className='my-8'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
