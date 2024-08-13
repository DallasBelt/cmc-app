import { RotatingLines } from 'react-loader-spinner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/DataTable';

import { usersColumns } from '@/config/usersColumns';
import getTableData from '@/hooks/getTableData';

const Users = () => {
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
      <div className='flex justify-center gap-8 py-16'>
        <Card className='w-1/3'>
          <CardHeader>
            <CardTitle className='text-4xl'>Estadísticas</CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>
            <p>{data.length} Usuarios</p>
            <p>{data.filter((user) => user.isActive).length} Activos</p>
            <p>{data.filter((user) => !user.isActive).length} Inactivos</p>
          </CardContent>
        </Card>

        <div className='w-2/3'>
          <DataTable columns={usersColumns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Users;
