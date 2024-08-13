import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import NewPatientDialog from '@/components/NewPatientDialog';
import { patientsColumns } from '@/config/patientsColumns';

const data = [
  {
    lastName: 'Gonzalez',
    firstName: 'Juan',
    dni: '1234567890',
    dob: '34',
  },
  {
    lastName: 'Martinez',
    firstName: 'Ana',
    dni: '0987654321001',
    dob: '38',
  },
  {
    lastName: 'Perez',
    firstName: 'Maria',
    dni: 'A1234567',
    dob: '31',
  },
  {
    lastName: 'Rodriguez',
    firstName: 'Carlos',
    dni: '1122334455',
    dob: '36',
  },
  {
    lastName: 'Lopez',
    firstName: 'Sofia',
    dni: '987654321001',
    dob: '29',
  },
  {
    lastName: 'Fernandez',
    firstName: 'Luis',
    dni: 'B7654321',
    dob: '45',
  },
  {
    lastName: 'Gomez',
    firstName: 'Laura',
    dni: '2233445566',
    dob: '33',
  },
  {
    lastName: 'Diaz',
    firstName: 'Jose',
    dni: '123456789001',
    dob: '41',
  },
  {
    lastName: 'Torres',
    firstName: 'Marta',
    dni: 'C9876543',
    dob: '30',
  },
  {
    lastName: 'Ruiz',
    firstName: 'Miguel',
    dni: '3344556677',
    dob: '37',
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
    <div className='flex flex-col gap-8 lg:flex-row'>
      <Card className='w-full h-fit'>
        <CardHeader>
          <CardTitle className='text-2xl lg:text-4xl'>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent className='text-lg lg:text-3xl'>
          <p>{data.length} Pacientes</p>
          <p>Atendidos</p>
          <p>Por atender</p>
        </CardContent>
      </Card>

      <div className='w-full'>
        <div className='flex flex-col gap-5'>
          <div>
            <NewPatientDialog />
          </div>
          <DataTable columns={patientsColumns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Patients;
