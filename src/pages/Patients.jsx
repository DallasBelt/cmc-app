import { Loader2 } from 'lucide-react';

import { CreatePatientDialog } from '@/components/patients';
import { PatientsTable } from '@/components/tables/';

import { useAssistants, usePatients } from '@/hooks';

export const Patients = () => {
  const currentUserId = sessionStorage.getItem('id');
  const currentRole = sessionStorage.getItem('role');

  const { assistantsQuery } = useAssistants();
  const { patientsQuery } = usePatients();

  let medicId = null;

  if (currentRole === 'medic') {
    medicId = currentUserId;
  } else if (currentRole === 'assistant') {
    const assistants = assistantsQuery.data ?? [];
    const assigned = assistants.find((a) => a.id === currentUserId);
    medicId = assigned?.medicId ?? null;
  }

  const patientList = Array.isArray(patientsQuery.data?.data) ? patientsQuery.data.data : [];

  // Show only the patients of the authenticated medic
  const data = patientList ? patientList.filter((patient) => patient.medic.id === medicId) : [];

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
          <PatientsTable data={data} />
        </div>
      )}
    </>
  );
};
