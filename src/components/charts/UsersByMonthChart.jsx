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

import { useUsers } from '@/hooks';

const chartConfig = {
  users: {
    label: 'Usuarios',
    color: '#2563EB',
  },
  medics: {
    label: 'Médicos',
    color: '#60A5FA',
  },
  assistants: {
    label: 'Asistentes',
    color: '#CBDCEB',
  },
};

export const UsersByMonthChart = () => {
  const { usersQuery } = useUsers();
  const users = usersQuery.data?.data ?? [];

  const groupUsersByMonth = (users) => {
    const stats = {};

    users.forEach((user) => {
      if (!user.createdAt) return;

      const date = new Date(user.createdAt);
      const month = format(date, 'MMMM', { locale: es });

      if (!stats[month]) {
        stats[month] = { users: 0, medics: 0, assistants: 0 };
      }

      stats[month].users += 1;

      if (user.role === 'medic') {
        stats[month].medics += 1;
      } else if (user.role === 'assistant') {
        stats[month].assistants += 1;
      }
    });

    return Object.entries(stats)
      .sort(([a], [b]) => {
        const getDate = (month) => new Date(`${month} 01, 2025`);
        return getDate(a) - getDate(b);
      })
      .map(([month, values]) => ({
        month,
        ...values,
      }));
  };

  const chartData = groupUsersByMonth(users);

  return (
    <div className='mt-10'>
      <h2 className='text-xl font-semibold mb-4'>Usuarios registrados por mes</h2>

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
          <Bar dataKey='users' fill='var(--color-users)' radius={4} />
          <Bar dataKey='medics' fill='var(--color-medics)' radius={4} />
          <Bar dataKey='assistants' fill='var(--color-assistants)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
