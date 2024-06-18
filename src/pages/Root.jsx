import { Link, Outlet } from 'react-router-dom';

import NavMenu from '@/components/NavMenu';
import AvatarMenu from '@/components/AvatarMenu';
import logo from '@/assets/logo.svg';

const Root = () => {
  return (
    <>
      <div className='flex flex-col justify-center h-20 px-5 py-3 md:flex-row md:justify-between bg-slate-100 mb-5 md:px-20 shadow-md'>
        <Link to='/'>
          <img src={logo} className='w-16 md:block md:w-32 md:mb-0' />
        </Link>

        <NavMenu />

        <AvatarMenu />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
