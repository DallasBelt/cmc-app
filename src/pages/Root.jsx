import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';

import { List, SignOut } from '@phosphor-icons/react';

import { AvatarMenu, ModeToggle, NavMenu } from '@/components';
import { useTheme } from '@/components/theme-provider';
import navbarLogo from '@/assets/navbar-logo.svg';

export const Root = () => {
  const { effectiveTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isCompleteInfo = location.pathname === '/complete-info';

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSignOut = () => {
    // Remove sessionStorage items
    sessionStorage.clear();

    // Redirects to the login page
    navigate('/login');
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

      <nav className='px-24 sticky top-0 z-50 flex items-center justify-between gap-5 h-20 backdrop-filter backdrop-blur-lg bg-opacity-30'>
        <Link to='/' className={isCompleteInfo ? 'flex' : 'hidden md:flex'}>
          <img src={navbarLogo} className='w-12' />
        </Link>

        <div className={isCompleteInfo ? 'hidden' : 'flex'}>
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

        <div
          className={isCompleteInfo ? 'hidden' : 'hidden md:flex md:mr-auto'}
        >
          <NavMenu />
        </div>

        <div className={isCompleteInfo ? 'flex gap-1' : 'flex gap-5'}>
          <ModeToggle />

          <div className={isCompleteInfo ? 'flex' : 'hidden'}>
            <Button variant='ghost' size='icon' onClick={handleSignOut}>
              <SignOut size={24} className='me-1' />
            </Button>
          </div>

          <div className={isCompleteInfo ? 'hidden' : 'hidden md:flex'}>
            <AvatarMenu />
          </div>
        </div>
      </nav>

      <div className='container mx-auto px-24 my-8'>
        <Outlet />
      </div>
    </>
  );
};
