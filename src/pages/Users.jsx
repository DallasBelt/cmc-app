import { useEffect, useState } from 'react';
import axios from 'axios';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usersColumns } from '@/config/usersColumns';
import { DataTable } from '@/components/DataTable';
import { toast } from 'sonner';

import { Oval } from 'react-loader-spinner';

async function getData() {
  try {
    // Check auth
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Oops!', {
        description: `Error de autenticación.`,
      });
    }

    // Send the request to the server
    const res = await axios.get(
      'https://cmc-api-42qy.onrender.com/api/v1/auth/all',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersActive, setTotalUsersActive] = useState(0);
  const [totalUsersInactive, setTotalUsersInactive] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
      setTotalUsers(result.length);
      setTotalUsersActive(
        result.filter((user) => user.isActive === true).length
      );
      setTotalUsersInactive(
        result.filter((user) => user.isActive === false).length
      );
    }

    fetchData();
  }, [data]);

  if (loading) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <Oval
          visible={true}
          height='100'
          width='100'
          color='#2563eb'
          secondaryColor='#2563eb'
          strokeWidth={6}
          ariaLabel='oval-loading'
        />
      </div>
    );
  }

  return (
    <>
      <div className='p-10 md:p-20 space-y-14'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <Card className='md:w-1/3 md:h-fit'>
            <CardHeader>
              <CardTitle className='text-3xl'>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className='text-2xl'>
              <p>Usuarios: {totalUsers}</p>
              <p>Activos: {totalUsersActive} </p>
              <p>Inactivos: {totalUsersInactive}</p>
            </CardContent>
          </Card>

          <div className='md:w-2/3'>
            <DataTable columns={usersColumns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
