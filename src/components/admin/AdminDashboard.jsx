import { HandHelping, Hourglass, Stethoscope, UsersRound } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useUsers } from '@/hooks';

export const AdminDashboard = () => {
  const { usersQuery } = useUsers();

  const users = usersQuery.data?.data ?? [];

  const totalUsers = users.length;
  const totalMedics = users.filter((u) => u.role === 'medic').length;
  const totalAssistants = users.filter((u) => u.role === 'assistant').length;
  const totalPending = users.filter((u) => u.status === 'pending').length;

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='bg-secondary text-primary flex flex-col items-center'>
        <CardHeader>
          <CardTitle className='text-4xl flex items-center gap-3 lg:flex-col'>
            <UsersRound size={50} /> Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{totalUsers}</CardContent>
      </Card>

      <Card className='bg-secondary text-primary flex flex-col items-center'>
        <CardHeader>
          <CardTitle className='text-4xl flex items-center gap-3 lg:flex-col'>
            <Stethoscope size={50} /> <p>Médicos</p>
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{totalMedics}</CardContent>
      </Card>

      <Card className='bg-secondary text-primary flex flex-col items-center'>
        <CardHeader>
          <CardTitle className='text-4xl flex items-center gap-3 lg:flex-col'>
            <HandHelping size={50} /> Asistentes
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{totalAssistants}</CardContent>
      </Card>

      <Card className='bg-secondary text-primary flex flex-col items-center'>
        <CardHeader>
          <CardTitle className='text-4xl flex items-center gap-3 lg:flex-col'>
            <Hourglass size={50} /> Pendientes
          </CardTitle>
        </CardHeader>
        <CardContent className='text-6xl'>{totalPending}</CardContent>
      </Card>
    </div>
  );
};
