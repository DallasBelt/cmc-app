import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { usersColumns } from '@/config/usersColumns';
import { UsersDataTable } from '@/components/UsersDataTable';

async function getData() {
  // Fetch data from your API here.
  return [
    {
      email: 'mcarrasco@cmc.com',
      id: '0200549905',
      role: 'Médico',
      fullName: 'Mauro Carrasco',
      age: 66,
      status: 'Activo',
    },
    {
      email: 'jastudillo@gmail.com',
      id: '1866453370',
      role: 'Médico',
      fullName: 'José Astudillo',
      age: 40,
      status: 'Activo',
    },
    {
      email: 'ecedeno@hotmail.com',
      id: '0102345556',
      role: 'Médico',
      fullName: 'Evelyn Cedeño',
      age: 33,
      status: 'Activo',
    },
    {
      email: 'ccalle@yahoo.com',
      id: '0203040506',
      role: 'Asistente',
      fullName: 'Claudia Calle',
      age: 33,
      status: 'Inactivo',
    },
    {
      email: 'psalazar@icloud.com',
      id: '3444555566001',
      role: 'Usuario',
      fullName: 'Pedro Salazar',
      age: 67,
      status: 'Inactivo',
    },
    // ...
  ];
}

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className='px-20 md:px-36'>
        <div className='flex flex-col md:flex-row gap-3'>
          <Card className='md:w-1/3'>
            <CardHeader>
              <CardTitle>Total</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card className='md:w-1/3'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card className='md:w-1/3'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

        <div className='container mx-auto py-10'>
          <UsersDataTable columns={usersColumns} data={data} />
        </div>
      </div>
    </>
  );
};

export default Users;
