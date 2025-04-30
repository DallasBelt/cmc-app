import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Toaster,
} from '@/components/ui';

import { Menu, LogOut } from 'lucide-react';

import { AvatarMenu, NavMenu, ThemeToggle } from '@/components/interaction';
import { useTheme } from '@/components/theme/ThemeProvider';
import navbarLogo from '@/assets/navbar-logo.svg';

export const Root = () => {
  const navigate = useNavigate();
  const { effectiveTheme } = useTheme();

  const isProfileComplete = sessionStorage.getItem('isProfileComplete');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
        <Link
          to='/'
          className={isProfileComplete !== 'true' ? 'flex' : 'hidden md:flex'}
        >
          <img src={navbarLogo} className='w-12' />
        </Link>

        <div className={isProfileComplete !== 'true' ? 'hidden' : 'flex'}>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className='flex md:hidden'>
              <Menu size={24} weight='bold' />
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
          className={
            isProfileComplete !== 'true'
              ? 'hidden'
              : 'hidden md:flex md:mr-auto'
          }
        >
          <NavMenu />
        </div>

        <div
          className={isProfileComplete !== 'true' ? 'flex gap-1' : 'flex gap-5'}
        >
          <ThemeToggle />

          <div className={isProfileComplete !== 'true' ? 'flex' : 'hidden'}>
            <Button variant='ghost' size='icon' onClick={handleSignOut}>
              <LogOut size={24} className='me-1' />
            </Button>
          </div>

          <div
            className={
              isProfileComplete !== 'true' ? 'hidden' : 'hidden md:flex'
            }
          >
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
