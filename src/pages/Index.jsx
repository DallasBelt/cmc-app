import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  return (
    <div className='p-10 md:p-20 space-y-14'>
      <div className='flex flex-col gap-5 md:flex-row'>
        <Card className='md:w-1/4'>
          <CardHeader>
            <CardTitle className='text-3xl'>Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total:</p>
            <p>Activos:</p>
            <p>Inactivos:</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card className='md:w-1/4'>
          <CardHeader>
            <CardTitle className='text-3xl'>Médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total:</p>
            <p>Activos:</p>
            <p>Especialidades:</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card className='md:w-1/4'>
          <CardHeader>
            <CardTitle className='text-3xl'>Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total:</p>
            <p>Atendidos:</p>
            <p>Sin atender:</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card className='md:w-1/4'>
          <CardHeader>
            <CardTitle className='text-3xl'>Citas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total:</p>
            <p>Finalizadas:</p>
            <p>Pendientes:</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
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
