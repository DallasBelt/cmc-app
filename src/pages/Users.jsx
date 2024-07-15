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
      fullName: 'Edwin Vargas',
      email: 'evg@gmail.com',
      role: 'Paciente',
      status: 'Inactivo',
    },
    {
      fullName: 'Ana Perez',
      email: 'aperez@gmail.com',
      role: 'Paciente',
      status: 'Inactivo',
    },
    {
      fullName: 'Carlos Lopez',
      email: 'clopez@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Laura Garcia',
      email: 'lgarcia@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Luis Fernandez',
      email: 'lfernandez@gmail.com',
      role: 'Médico',
      status: 'Activo',
    },
    {
      fullName: 'Maria Rodriguez',
      email: 'mrodriguez@gmail.com',
      role: 'Paciente',
      status: 'Inactivo',
    },
    {
      fullName: 'Pedro Gonzalez',
      email: 'pgonzalez@gmail.com',
      role: 'Paciente',
      status: 'Inactivo',
    },
    {
      fullName: 'Juan Martinez',
      email: 'jmartinez@gmail.com',
      role: 'Paciente',
      status: 'Activo',
    },
    {
      fullName: 'Sofia Sanchez',
      email: 'ssanchez@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'David Ramirez',
      email: 'dramirez@gmail.com',
      role: 'Médico',
      status: 'Inactivo',
    },
    {
      fullName: 'Marta Diaz',
      email: 'mdiaz@gmail.com',
      role: 'Paciente',
      status: 'Inactivo',
    },
    {
      fullName: 'Jose Morales',
      email: 'jmorales@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Lucia Ortega',
      email: 'lortega@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Ricardo Vega',
      email: 'rvega@gmail.com',
      role: 'Médico',
      status: 'Inactivo',
    },
    {
      fullName: 'Elena Torres',
      email: 'etorres@gmail.com',
      role: 'Paciente',
      status: 'Activo',
    },
    {
      fullName: 'Daniel Castro',
      email: 'dcastro@gmail.com',
      role: 'Médico',
      status: 'Inactivo',
    },
    {
      fullName: 'Valeria Suarez',
      email: 'vsuarez@gmail.com',
      role: 'Médico',
      status: 'Activo',
    },
    {
      fullName: 'Miguel Romero',
      email: 'mromero@gmail.com',
      role: 'Usuario',
      status: 'Activo',
    },
    {
      fullName: 'Camila Herrera',
      email: 'cherrera@gmail.com',
      role: 'Médico',
      status: 'Inactivo',
    },
    {
      fullName: 'Andres Gutierrez',
      email: 'agutierrez@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Paula Blanco',
      email: 'pblanco@gmail.com',
      role: 'Médico',
      status: 'Activo',
    },
    {
      fullName: 'Alberto Ruiz',
      email: 'aruiz@gmail.com',
      role: 'Médico',
      status: 'Activo',
    },
    {
      fullName: 'Gabriela Mendoza',
      email: 'gmendoza@gmail.com',
      role: 'Médico',
      status: 'Activo',
    },
    {
      fullName: 'Rafael Soto',
      email: 'rsoto@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Adriana Rios',
      email: 'arios@gmail.com',
      role: 'Médico',
      status: 'Inactivo',
    },
    {
      fullName: 'Jorge Campos',
      email: 'jcampos@gmail.com',
      role: 'Usuario',
      status: 'Inactivo',
    },
    {
      fullName: 'Patricia Medina',
      email: 'pmedina@gmail.com',
      role: 'Paciente',
      status: 'Activo',
    },
    {
      fullName: 'Raul Guzman',
      email: 'rguzman@gmail.com',
      role: 'Usuario',
      status: 'Activo',
    },
    {
      fullName: 'Sandra Alvarado',
      email: 'salvarado@gmail.com',
      role: 'Usuario',
      status: 'Activo',
    },
    {
      fullName: 'Ivan Morales',
      email: 'imorales@gmail.com',
      role: 'Paciente',
      status: 'Activo',
    },
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
