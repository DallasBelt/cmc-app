import { useState } from 'react';
import {
  CalendarCheck2,
  ClipboardList,
  Pencil,
  Stethoscope,
  Trash,
  X,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui';

import {
  AppointmentDialog,
  ChangeAppointmentStatusDialog,
  DeleteAppointmentDialog,
} from '@/components/appointments';

import { MedicalRecordDialog } from '@/components/medical-records';

import { useAppointmentStore } from '@/store';

export const AppointmentDropdown = () => {
  const {
    appointmentData,
    appointmentDropdown,
    appointmentDropdownPosition,
    setAppointmentDropdown,
    setChangeAppointmentStatusDialog,
    setCreateAppointmentDialog,
    setDeleteAppointmentDialog,
    setEditAppointment,
  } = useAppointmentStore();

  const [medicalRecordDialogOpen, setMedicalRecordDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu
        open={appointmentDropdown}
        onOpenChange={setAppointmentDropdown}
      >
        <DropdownMenuContent
          align='end'
          className='flex flex-col'
          style={{
            position: 'absolute',
            top: appointmentDropdownPosition.top,
            left: appointmentDropdownPosition.left,
          }}
        >
          {/* Attend */}
          <DropdownMenuItem
            className={
              appointmentData.status === 'canceled' ||
              appointmentData.status === 'completed'
                ? 'hidden'
                : 'cursor-pointer'
            }
            onSelect={() => {
              setMedicalRecordDialogOpen(true);
            }}
          >
            <Stethoscope size={16} className='me-2' />
            Atender
          </DropdownMenuItem>

          {/* Edit */}
          <DropdownMenuItem
            className={
              appointmentData.status === 'canceled' ||
              appointmentData.status === 'completed'
                ? 'hidden'
                : 'cursor-pointer'
            }
            onSelect={() => {
              setCreateAppointmentDialog(true);
              setEditAppointment(true);
            }}
          >
            <Pencil size={16} className='me-2' />
            Editar
          </DropdownMenuItem>

          {/* Change status */}
          <DropdownMenuItem
            className={
              appointmentData.status === 'completed'
                ? 'hidden'
                : 'cursor-pointer'
            }
            onSelect={() => {
              setChangeAppointmentStatusDialog(true);
            }}
          >
            {appointmentData.status === 'canceled' ? (
              <CalendarCheck2 size={16} className='me-2' />
            ) : (
              <X size={16} className='me-2' />
            )}
            {appointmentData.status === 'canceled' ? 'Reagendar' : 'Cancelar'}
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem
            className={
              appointmentData.status === 'completed'
                ? 'hidden'
                : 'cursor-pointer'
            }
            onSelect={() => {
              setDeleteAppointmentDialog(true);
            }}
          >
            <Trash size={16} className='me-2' />
            Eliminar
          </DropdownMenuItem>

          {/* View Medical Record */}
          <DropdownMenuItem
            className={
              appointmentData.status === 'canceled' ||
              appointmentData.status === 'pending'
                ? 'hidden'
                : 'cursor-pointer'
            }
            onSelect={() => {
              console.log('View Medical Record');
            }}
          >
            <ClipboardList size={16} className='me-2' />
            Ver Historial
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MedicalRecordDialog
        open={medicalRecordDialogOpen}
        onOpenChange={setMedicalRecordDialogOpen}
      />
      <AppointmentDialog />
      <ChangeAppointmentStatusDialog />
      <DeleteAppointmentDialog />
    </>
  );
};
