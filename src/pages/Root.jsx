import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';

import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Toaster,
} from '@/components/ui';

import { UpdatePasswordDialog } from '@/components/auth';
import { AvatarMenu, NavMenu, ThemeToggle } from '@/components/interaction';
import { useTheme } from '@/components/theme/ThemeProvider';
import navbarLogo from '@/assets/navbar-logo.svg';

import { useAuth } from '@/hooks';

export const Root = () => {
  const { effectiveTheme } = useTheme();
  const { logoutMutation } = useAuth();

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

      <nav className='px-24 sticky top-0 z-50 flex items-center justify-between gap-5 h-20 backdrop-filter backdrop-blur-lg bg-opacity-30'>
        <Link to='/' className='flex'>
          <img src={navbarLogo} className='w-12' />
        </Link>

        <div className='flex'>
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

        <div className='hidden md:flex md:mr-auto'>
          <NavMenu />
        </div>

        <div className='flex gap-5'>
          <ThemeToggle />

          <div className='hidden'>
            <Button variant='ghost' size='icon' onClick={() => logoutMutation.mutate()}>
              <LogOut size={24} className='me-1' />
            </Button>
          </div>

          <div className='hidden md:flex'>
            <AvatarMenu />
          </div>
        </div>
      </nav>

      <div className='container mx-auto px-24 my-8'>
        <Outlet />
        <UpdatePasswordDialog />
      </div>
    </>
  );
};
