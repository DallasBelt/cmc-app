import { RotatingLines } from 'react-loader-spinner';

import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import NewPatientDialog from '@/components/NewPatientDialog';
import { patientsColumns } from '@/config/patientsColumns';
import { usePatients } from '@/hooks/usePatients';

const Patients = () => {
  const { patients, loading } = usePatients();

  // Filters only the authenticated medic's patients
  const data = patients
    ? patients.filter(
        (patient) => patient.medic.id === sessionStorage.getItem('id')
      )
    : [];

  // Show loading spinner while fetching data
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
    <div className='flex flex-col gap-5'>
      <NewPatientDialog />
      <DataTable columns={patientsColumns} data={data} />
    </div>
  );
};

export default Patients;
