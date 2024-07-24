import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { usersColumns } from '@/config/usersColumns';
import { DataTable } from '@/components/DataTable';

import { Oval } from 'react-loader-spinner';

async function getData() {
  const token = sessionStorage.getItem('token');

  const res = await axios.get(
    'https://cmc-api-42qy.onrender.com/api/v1/auth/all',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data.data;
  // Fetch data from your API here.
  // return [
  //   {
  //     email: 'luisf1988@gmail.com',
  //     role: 'user',
  //     status: true,
  //   },
  //   {
  //     email: 'johndoe@example.com',
  //     role: 'medic',
  //     status: false,
  //   },
  //   {
  //     email: 'janesmith@example.com',
  //     role: 'assistant',
  //     status: true,
  //   },
  //   {
  //     email: 'peterparker@example.com',
  //     role: 'user',
  //     status: false,
  //   },
  //   {
  //     email: 'brucewayne@example.com',
  //     role: 'medic',
  //     status: true,
  //   },
  //   {
  //     email: 'clarkkent@example.com',
  //     role: 'assistant',
  //     status: false,
  //   },
  //   {
  //     email: 'dianaprince@example.com',
  //     role: 'user',
  //     status: true,
  //   },
  //   {
  //     email: 'barryallen@example.com',
  //     role: 'medic',
  //     status: false,
  //   },
  //   {
  //     email: 'arthurcurry@example.com',
  //     role: 'assistant',
  //     status: true,
  //   },
  //   {
  //     email: 'victorstone@example.com',
  //     role: 'user',
  //     status: false,
  //   },
  // ];
}

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
      setTotalUsers(result.length);
    }

    fetchData();
  }, []);

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
              <p>Total: {totalUsers}</p>
              <p>Activos: </p>
              <p>Inactivos: </p>
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
