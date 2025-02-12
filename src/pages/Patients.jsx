import { DataTable } from '@/components/DataTable';

import NewPatientDialog from '@/components/NewPatientDialog';
import { patientsColumns } from '@/config/patientsColumns';
import { usePatients } from '@/hooks/usePatients';

import { Loader2 } from 'lucide-react';

const Patients = () => {
  const { patientsQuery } = usePatients();

  const patientList = Array.isArray(patientsQuery.data?.data)
    ? patientsQuery.data.data
    : [];

  // Show only the patients of the authenticated medic
  const data = patientList
    ? patientList.filter(
        (patient) => patient.medic.id === sessionStorage.getItem('id')
      )
    : [];

  return patientsQuery.isFetching ? (
    <div className='h-96 flex justify-center items-center'>
      <Loader2 size={50} className='animate-spin' />
    </div>
  ) : (
    <div className='flex flex-col gap-5'>
      <NewPatientDialog />
      <DataTable columns={patientsColumns} data={data} />
    </div>
  );
};

export default Patients;
