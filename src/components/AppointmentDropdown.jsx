import { useState } from 'react';
import { CalendarCheck2, Pencil, Stethoscope, Trash, X } from 'lucide-react';

import {
  AppointmentDialog,
  ChangeAppointmentStatusDialog,
  DeleteAppointmentDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  HistoryDialog,
} from '@/components';

import { useAppointmentStore } from '@/store';

export const AppointmentDropdown = () => {
  const appointmentStatus = useAppointmentStore(
    (state) => state.appointmentStatus
  );
  const setEditAppointment = useAppointmentStore(
    (state) => state.setEditAppointment
  );
  const appointmentDropdown = useAppointmentStore(
    (state) => state.appointmentDropdown
  );
  const setAppointmentDropdown = useAppointmentStore(
    (state) => state.setAppointmentDropdown
  );
  const appointmentDropdownPosition = useAppointmentStore(
    (state) => state.appointmentDropdownPosition
  );
  const setCreateAppointmentDialog = useAppointmentStore(
    (state) => state.setCreateAppointmentDialog
  );
  const setChangeAppointmentStatusDialog = useAppointmentStore(
    (state) => state.setChangeAppointmentStatusDialog
  );
  const setDeleteAppointmentDialog = useAppointmentStore(
    (state) => state.setDeleteAppointmentDialog
  );

  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

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
              appointmentStatus === 'canceled' ? 'hidden' : 'cursor-pointer'
            }
            onSelect={() => {
              setHistoryDialogOpen(true);
            }}
          >
            <Stethoscope size={16} className='me-2' />
            Atender
          </DropdownMenuItem>

          {/* Edit */}
          <DropdownMenuItem
            className={
              appointmentStatus === 'canceled' ? 'hidden' : 'cursor-pointer'
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
            className={'cursor-pointer'}
            onSelect={() => {
              setChangeAppointmentStatusDialog(true);
            }}
          >
            {appointmentStatus === 'canceled' ? (
              <CalendarCheck2 size={16} className='me-2' />
            ) : (
              <X size={16} className='me-2' />
            )}
            {appointmentStatus === 'canceled' ? 'Reagendar' : 'Cancelar'}
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={() => {
              setDeleteAppointmentDialog(true);
            }}
          >
            <Trash size={16} className='me-2' />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <HistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
      />
      <AppointmentDialog />
      <ChangeAppointmentStatusDialog />
      <DeleteAppointmentDialog />
    </>
  );
};
