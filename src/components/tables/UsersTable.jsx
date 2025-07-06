import { Loader2 } from 'lucide-react';

import { DataTable } from '@/components/tables';
import { usersColumns } from '@/config/usersColumns';
import { useUsers } from '@/hooks';

export const UsersTable = () => {
  const { usersQuery } = useUsers();
  const data = Array.isArray(usersQuery.data?.data) ? usersQuery.data.data : [];

  const globalFilterFn = (row, columnId, filterValue) => {
    const email = row.getValue('email') || '';
    return email.toLowerCase().includes(filterValue.toLowerCase());
  };

  if (usersQuery.isPending) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <Loader2 size={50} className='animate-spin' />
      </div>
    );
  }

  return (
    <DataTable
      columns={usersColumns}
      data={data}
      globalFilterFn={globalFilterFn}
      defaultSort={[{ id: 'email', desc: false }]}
      enableRowSelection={false}
    />
  );
};
