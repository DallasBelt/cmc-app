import { differenceInYears, format } from 'date-fns';

import { Dialog, DialogContent, DialogHeader, DialogTitle, Label } from '@/components/ui';
import { MedicalRecordForm } from '@/components/medical-records';

import { useAppointmentStore, useMedicalRecordStore, usePatientStore } from '@/store';

export const MedicalRecordDialog = () => {
  const { patientData } = usePatientStore();
  const { appointmentData } = useAppointmentStore();
  const { dialogOpen, setDialogOpen } = useMedicalRecordStore();

  const hasValidPatient =
    appointmentData?.patient && Object.keys(appointmentData.patient).length > 0;
  const patient = hasValidPatient ? appointmentData.patient : (patientData ?? null);
  if (!patient) return null;

  const calculateAge = (dob) => {
    return differenceInYears(new Date(), new Date(dob));
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent
        aria-describedby={undefined}
        className='max-w-4xl max-h-[80%] overflow-y-auto select-none'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-3xl'>Nueva entrada</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <Label>
              Fecha: <span className='font-normal'>{format(new Date(), 'dd/MM/yyyy, HH:mm')}</span>
            </Label>
            <Label>
              Paciente:{' '}
              <span className='font-normal'>{`${patient.firstName} ${patient.lastName} (${calculateAge(patient?.dob)})`}</span>
            </Label>
            <Label>
              Identificación: <span className='font-normal'>{patient.dni}</span>
            </Label>
          </div>
          <div className='flex flex-col gap-2'>
            <Label>
              Alergias: <span className='font-normal'>{patient?.allergies ?? '(Sin datos)'}</span>
            </Label>
            <Label>
              Antecedentes personales:{' '}
              <span className='font-normal'>{patient?.personalHistory ?? '(Sin datos)'}</span>
            </Label>
            <Label>
              Antecedentes familiares:{' '}
              <span className='font-normal'>{patient?.familyHistory ?? '(Sin datos)'}</span>
            </Label>
          </div>
        </div>
        <MedicalRecordForm />
      </DialogContent>
    </Dialog>
  );
};
