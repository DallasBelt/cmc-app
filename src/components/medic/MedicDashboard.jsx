import { CalendarCheck, CalendarClock, CalendarX, UsersRound } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAppointments, useMedicInfo, usePatients } from '@/hooks';

export const MedicDashboard = () => {
  const { patientsQuery } = usePatients();
  const { appointmentsQuery } = useAppointments();
  const { medicId } = useMedicInfo();

  const patients = (patientsQuery?.data ?? []).filter((patient) => patient.medic.id === medicId);
  const appointments = (appointmentsQuery.data?.data ?? []).filter(
    (appointment) => appointment.medic.id === medicId
  );

  const totalPatients = patients.length;
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === 'pending'
  );
  const canceledAppointments = appointments.filter(
    (appointment) => appointment.status === 'canceled'
  );
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === 'completed'
  );

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='bg-secondary text-primary flex flex-col items-center justify-between'>
        <CardHeader className='flex flex-col items-center justify-center text-center'>
          <CardTitle className='text-4xl flex flex-col items-center gap-2'>
            <UsersRound size={50} /> Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{totalPatients}</CardContent>
      </Card>

      <Card className='bg-secondary text-primary flex flex-col items-center justify-between'>
        <CardHeader className='flex flex-col items-center justify-center text-center'>
          <CardTitle className='text-4xl flex flex-col items-center gap-2'>
            <CalendarClock size={50} />
            Citas pendientes
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{pendingAppointments.length}</CardContent>
      </Card>

      <Card className='bg-secondary text-primary flex flex-col items-center justify-between'>
        <CardHeader className='flex flex-col items-center justify-center text-center'>
          <CardTitle className='text-4xl flex flex-col items-center gap-2'>
            <CalendarX size={50} /> Citas canceladas
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{canceledAppointments.length}</CardContent>
      </Card>

      <Card className='bg-secondary text-primary flex flex-col items-center justify-between'>
        <CardHeader className='flex flex-col items-center justify-center text-center'>
          <CardTitle className='text-4xl flex flex-col items-center gap-2'>
            <CalendarCheck size={50} /> Citas atendidas
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{completedAppointments.length}</CardContent>
      </Card>
    </div>
  );
};
