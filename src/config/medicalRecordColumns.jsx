import { format } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { es } from 'date-fns/locale';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

import { MedicalRecordDetails } from '@/components/medical-records';

export const medicalRecordColumns = [
  {
    accessorKey: 'createdAt',
    header: 'Fecha',
    cell: ({ row }) => {
      const utcString = row.original.createdAt;
      const tzDate = new TZDate(utcString, 'America/Guayaquil');
      const formatted = format(tzDate, 'dd/MM/yyyy, HH:mm', { locale: es });
      return formatted;
    },
  },
  {
    accessorKey: 'symptoms',
    header: 'Síntomas',
    cell: ({ row }) => {
      const text = row.original.symptoms || '-';
      return (
        <span
          className='block max-w-[250px] truncate whitespace-nowrap overflow-hidden'
          title={text}
        >
          {text}
        </span>
      );
    },
  },
  {
    accessorKey: 'diagnostic',
    header: 'Diagnóstico',
    cell: ({ row }) => {
      const text = row.original.diagnostic || '-';
      return (
        <span
          className='block max-w-[250px] truncate whitespace-nowrap overflow-hidden'
          title={text}
        >
          {text}
        </span>
      );
    },
  },
  {
    accessorKey: 'treatment',
    header: 'Tratamiento',
    cell: ({ row }) => {
      const text = row.original.treatment || '-';
      return (
        <span
          className='block max-w-[250px] truncate whitespace-nowrap overflow-hidden'
          title={text}
        >
          {text}
        </span>
      );
    },
  },
  {
    id: 'details',
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size='sm'>Ver detalles</Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby={undefined}
            className='max-w-4xl max-h-[80%] overflow-y-auto select-none'
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle className='text-3xl'>Detalles del registro</DialogTitle>
            </DialogHeader>
            <MedicalRecordDetails row={row} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
