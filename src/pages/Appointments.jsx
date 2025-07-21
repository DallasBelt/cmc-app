import { Calendar } from '@/components/calendar';
import {
  AppointmentDialog,
  ChangeAppointmentStatusDialog,
  DeleteAppointmentDialog,
} from '@/components/appointments';
import { MedicalRecordDialog } from '@/components/medical-records';

export const Appointments = () => {
  return (
    <>
      <Calendar />
      <AppointmentDialog />
      <ChangeAppointmentStatusDialog />
      <DeleteAppointmentDialog />
      <MedicalRecordDialog />
    </>
  );
};
