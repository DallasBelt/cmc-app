import { RotatingLines } from 'react-loader-spinner';

import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import NewPatientDialog from '@/components/NewPatientDialog';
import { patientsColumns } from '@/config/patientsColumns';
import getTableData from '@/hooks/getTableData';

const Patients = () => {
  const token = sessionStorage.getItem('token');

  const { data, loading } = getTableData(
    'http://localhost:3000/api/v1/patient',
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
    <div className='flex flex-col gap-8 md:flex-row'>
      <Card className='w-full h-fit md:w-1/3'>
        <CardHeader>
          <CardTitle className='text-2xl lg:text-4xl'>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent className='text-lg lg:text-3xl'>
          <p>
            {data.length} {data.length > 1 ? 'Pacientes' : 'Paciente'}
          </p>
          <p>Atendidos</p>
          <p>Por atender</p>
        </CardContent>
      </Card>

      <div className='w-full md:w-2/3'>
        <div className='flex flex-col gap-5'>
          <NewPatientDialog />
          <DataTable columns={patientsColumns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Patients;
