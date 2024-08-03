import { DataTable } from '@/components/DataTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { patientsColumns } from '@/config/patientsColumns';

const data = [
  {
    lastName: 'Gonzalez',
    firstName: 'Juan',
    dni: '1234567890',
  },
  {
    lastName: 'Martinez',
    firstName: 'Ana',
    dni: '0987654321001',
  },
  {
    lastName: 'Perez',
    firstName: 'Maria',
    dni: 'A1234567',
  },
  {
    lastName: 'Rodriguez',
    firstName: 'Carlos',
    dni: '1122334455',
  },
  {
    lastName: 'Lopez',
    firstName: 'Sofia',
    dni: '987654321001',
  },
  {
    lastName: 'Fernandez',
    firstName: 'Luis',
    dni: 'B7654321',
  },
  {
    lastName: 'Gomez',
    firstName: 'Laura',
    dni: '2233445566',
  },
  {
    lastName: 'Diaz',
    firstName: 'Jose',
    dni: '123456789001',
  },
  {
    lastName: 'Torres',
    firstName: 'Marta',
    dni: 'C9876543',
  },
  {
    lastName: 'Ruiz',
    firstName: 'Miguel',
    dni: '3344556677',
  },
];

const Patients = () => {
  const token = sessionStorage.getItem('token');

  // const { data, loading } = useFetchData(
  //   'http://localhost:3000/api/v1/patients',
  //   token
  // );

  // if (loading) {
  //   return (
  //     <div className='h-96 flex justify-center items-center'>
  //       <RotatingLines
  //         visible={true}
  //         height='100'
  //         width='100'
  //         strokeColor='#2563eb'
  //         strokeWidth={5}
  //         animationDuration='0.75'
  //         ariaLabel='rotating-lines-loading'
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className='p-10 md:p-20 space-y-14'>
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total</p>
            <p>Atendidos</p>
            <p>Por atender</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <DataTable columns={patientsColumns} data={data} />
      </div>
    </>
  );
};

export default Patients;
