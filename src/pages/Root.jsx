import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import NavMenu from '@/components/NavMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';

import { List, SignOut, User } from '@phosphor-icons/react';

import NavbarLogo from '@/assets/navbar-logo.svg';
import { useTheme } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ModeToggle';

const Root = () => {
  const location = useLocation();
  const disabledPaths = ['/complete-registration'];
  const isDisabled = disabledPaths.includes(location.pathname);

  const navigate = useNavigate();
  const { effectiveTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleSignOut = () => {
    // Remove the token
    sessionStorage.removeItem('token');

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
        expand
        visibleToasts={1}
      />

      <div className='container mx-auto'>
        <nav className='flex items-center justify-between gap-5 h-20 backdrop-filter backdrop-blur-lg bg-opacity-30'>
          <Link
            to={isDisabled ? location.pathname : '/'}
            className={isDisabled ? 'flex' : 'hidden md:flex'}
          >
            <img src={NavbarLogo} className='w-12' />
          </Link>

          <div className={isDisabled ? 'hidden' : 'block'}>
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

          <div className={isDisabled ? 'hidden' : 'hidden md:flex md:mr-auto'}>
            <NavMenu />
          </div>

          <div className='flex'>
            <ModeToggle />

            <Link
              to='/profile'
              className={isDisabled ? 'hidden' : 'hidden md:flex'}
            >
              <Button variant='ghost' size='icon'>
                <User size={20} />
              </Button>
            </Link>

            <div className={isDisabled ? 'flex' : 'hidden md:flex'}>
              <Button onClick={handleSignOut} variant='ghost' size='icon'>
                <SignOut size={20} />
              </Button>
            </div>
          </div>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
