import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
};

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const Index = () => {
  const location = useLocation();

  const isAdmin = sessionStorage.getItem('roles').includes('admin');

  useEffect(() => {
    if (location.state?.showToast) {
      toast.success('Bienvenido(a)', {
        description: location.state.toastMessage,
      });
    }
  }, [location.state]);

  return (
    <div className='py-16 space-y-16'>
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
            <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
            <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Index;
