import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { differenceInYears } from 'date-fns';
import { Loader2 } from 'lucide-react';

import { usePatients } from '@/hooks';
import { useMedicalRecordStore, usePatientStore } from '@/store';

import { Button } from '@/components/ui';
import { MedicalRecordDialog } from '@/components/medical-records';
import { MedicalRecordTable } from '@/components/tables';

export const MedicalRecord = () => {
  const { patientId } = useParams();
  const { patientByIdQuery } = usePatients(patientId);
  const { setDialogOpen, setUpdateAppointment } = useMedicalRecordStore();
  const { setPatientData } = usePatientStore();

  const patient = patientByIdQuery?.data ?? null;

  useEffect(() => {
    if (patient) {
      setPatientData(patient);
    }
  }, [patient, setPatientData]);

  if (patientByIdQuery.isLoading) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <Loader2 size={50} color='var(--primary)' className='animate-spin' />
      </div>
    );
  }

  const calculateAge = (dob) => {
    return differenceInYears(new Date(), new Date(dob));
  };

  return (
    <>
      <div className='flex flex-col gap-8'>
        <h1 className='text-2xl font-bold text-center'>Historial clínico</h1>
        <div className='flex flex-col justify-between gap-2.5 md:flex-row'>
          <div>
            <p>
              <span className='font-medium'>Paciente:</span>{' '}
              <span>
                {`${patient.firstName} ${patient.lastName} (${calculateAge(patient?.dob)})`}
              </span>
            </p>
            <p>
              <span className='font-medium'>Identificación:</span> <span>{patient.dni}</span>
            </p>
          </div>
          <Button
            onClick={() => {
              setDialogOpen(true);
              setUpdateAppointment(false);
            }}
            className='w-full md:w-fit'
          >
            Nueva entrada
          </Button>
        </div>
        <MedicalRecordTable />
        <MedicalRecordDialog />
      </div>
    </>
  );
};
