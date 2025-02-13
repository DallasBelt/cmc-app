import { RotatingLines } from 'react-loader-spinner';

import { DataTable } from '@/components';

import { getTableData } from '@/hooks';
import { usersColumns } from '@/config';

export const Users = () => {
  const token = sessionStorage.getItem('token');

  const { data, loading } = getTableData(
    'http://localhost:3000/api/v1/auth/all',
    token
  );

  if (loading) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <RotatingLines
          visible={true}
          height='100'
          width='100'
          strokeColor='#2563eb'
          strokeWidth={5}
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
        />
      </div>
    );
  }

  return (
    <div className=''>
      <DataTable columns={usersColumns} data={data} />
    </div>
  );
};
