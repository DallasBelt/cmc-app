import { Loader2 } from 'lucide-react';

import { DataTable } from '@/components/tables';
import { medicalRecordColumns } from '@/config/medicalRecordColumns';
import { useMedicalRecord } from '@/hooks';
import { usePatientStore } from '@/store';

export const MedicalRecordTable = () => {
  const { patientData } = usePatientStore();
  const { medicalRecordByPatientQuery } = useMedicalRecord(patientData.id);
  const data = medicalRecordByPatientQuery?.data ?? [];

  // const globalFilterFn = (row, columnId, filterValue) => {
  //   const createdAt = row.getValue('createdAt') || '';
  //   return createdAt.toLowerCase().includes(filterValue.toLowerCase());
  // };

  if (medicalRecordByPatientQuery.isPending) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <Loader2 size={50} className='animate-spin' />
      </div>
    );
  }

  return (
    <DataTable
      columns={medicalRecordColumns}
      data={data}
      // globalFilterFn={globalFilterFn}
      defaultSort={[{ id: 'createdAt', desc: true }]}
      enableRowSelection={false}
    />
  );
};
