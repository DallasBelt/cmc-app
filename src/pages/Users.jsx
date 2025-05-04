import { Loader2 } from 'lucide-react';

import { UsersTable } from '@/components/tables/';

import { useUsers } from '@/hooks';

export const Users = () => {
  const { usersQuery } = useUsers();

  const data = Array.isArray(usersQuery.data?.data) ? usersQuery.data.data : [];

  return (
    <>
      {usersQuery.isPending ? (
        <div className='h-96 flex justify-center items-center'>
          <Loader2 size={50} className='animate-spin' />
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          <UsersTable data={data} />
        </div>
      )}
    </>
  );
};
