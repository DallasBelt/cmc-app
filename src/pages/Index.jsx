import { useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { useToastStore } from '@/store/store';
import { Scheduler } from '@/components/Scheduler';

const chartConfig = {
  patients: {
    label: 'Pacientes',
    color: '#2563eb',
  },
  appointments: {
    label: 'Citas',
    color: '#60a5fa',
  },
};

const chartData = [
  { month: 'Enero', patients: 186, appointments: 80 },
  { month: 'Febrero', patients: 305, appointments: 200 },
  { month: 'Marzo', patients: 237, appointments: 120 },
  { month: 'Abril', patients: 73, appointments: 190 },
  { month: 'Mayo', patients: 209, appointments: 130 },
  { month: 'Junio', patients: 214, appointments: 140 },
];

const Index = () => {
  const { showToast, toastMessage, setToast } = useToastStore();
  const isAdmin = sessionStorage.getItem('roles').includes('admin');
  const isAssistant = sessionStorage.getItem('roles').includes('assistant');

  useEffect(() => {
    if (showToast) {
      toast.success(toastMessage);
      setToast(false, '');
    }
  }, [showToast, toastMessage, setToast]);

  return (
    <>
      <div className='flex flex-col gap-5 md:flex-row'>
        {isAdmin ? (
          <Card className='md:w-1/3'>
            <CardHeader>
              <CardTitle className='text-4xl'>Médicos</CardTitle>
            </CardHeader>
            <CardContent className='text-3xl'>
              <p>Total:</p>
              <p>Activos:</p>
              <p>Especialidades:</p>
            </CardContent>
          </Card>
        ) : (
          ''
        )}

        <Card className={isAdmin ? 'md:w-1/3' : 'md:w-1/2'}>
          <CardHeader>
            <CardTitle className='text-4xl'>Pacientes</CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>
            <p>Total:</p>
            <p>Atendidos:</p>
            <p>Sin atender:</p>
          </CardContent>
        </Card>

        <Card className={isAdmin ? 'md:w-1/3' : 'md:w-1/2'}>
          <CardHeader>
            <CardTitle className='text-4xl'>Citas</CardTitle>
          </CardHeader>
          <CardContent className='text-3xl'>
            <p>Total:</p>
            <p>Finalizadas:</p>
            <p>Pendientes:</p>
          </CardContent>
        </Card>
      </div>

      <div className='md:w-2/4'>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='patients' fill='var(--color-patients)' radius={4} />
            <Bar
              dataKey='appointments'
              fill='var(--color-appointments)'
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </div>

      <div className={isAdmin ? 'hidden' : 'block'}>
        <Scheduler />
      </div>
    </>
  );
};

export default Index;
