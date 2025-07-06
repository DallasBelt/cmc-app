import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { usePatients } from '@/hooks';

const chartConfig = {
  patients: {
    label: 'Pacientes',
    color: '#2563EB',
  },
};

export const PatientsByMonthChart = () => {
  const { patientsQuery } = usePatients();
  const patients = patientsQuery.data?.data ?? [];

  const data = patients
    ? patients.filter((patient) => patient.medic.id === sessionStorage.getItem('id'))
    : [];

  const groupPatientsByMonth = (patients) => {
    console.log(patients);
  };

  const chartData = groupPatientsByMonth(data);

  return (
    <div className='mt-10'>
      <h2 className='text-xl font-semibold mb-4'>Pacientes registrados por mes</h2>

      <ChartContainer config={chartConfig} className='min-h-[200px] w-3/5'>
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
        </BarChart>
      </ChartContainer>
    </div>
  );
};
