import { Loader2 } from 'lucide-react';

import { CreatePatientDialog } from '@/components/patients';
import { DataTable } from '@/components/tables/DataTable';

import { usePatients } from '@/hooks';
import { patientsColumns } from '@/config/patientsColumns';

export const Patients = () => {
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

  return (
    <>
      <div className='mb-5'>
        <CreatePatientDialog />
      </div>
      {patientsQuery.isPending ? (
        <div className='h-96 flex justify-center items-center'>
          <Loader2 size={50} className='animate-spin' />
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          <DataTable columns={patientsColumns} data={data} />
        </div>
      )}
    </>
  );
};
