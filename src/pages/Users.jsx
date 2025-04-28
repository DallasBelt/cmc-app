import { Loader2 } from 'lucide-react';

import { DataTable } from '@/components/tables/DataTable';

import { useUsers } from '@/hooks';
import { usersColumns } from '@/config';

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
          <DataTable columns={usersColumns} data={data} />
        </div>
      )}
    </>
  );
};
