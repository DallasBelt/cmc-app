import { CalendarCheck2, Pencil, Trash, X } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { EditAppointmentDialog } from '@/components/EditAppointmentDialog';
import { ChangeAppointmentStatusDialog } from '@/components/ChangeAppointmentStatusDialog';
import { DeleteAppointmentDialog } from '@/components/DeleteAppointmentDialog';

import { appointmentStore } from '@/store/appointmentStore';

export const AppointmentDropdown = () => {
  const dropdownOpen = appointmentStore((state) => state.dropdownOpen);
  const setDropdownOpen = appointmentStore((state) => state.setDropdownOpen);
  const dropdownPosition = appointmentStore((state) => state.dropdownPosition);

  const appointmentStatus = appointmentStore(
    (state) => state.appointmentStatus
  );

  const setEditDialogOpen = appointmentStore(
    (state) => state.setEditDialogOpen
  );

  const setChangeStatusDialogOpen = appointmentStore(
    (state) => state.setChangeStatusDialogOpen
  );

  const setDeleteDialogOpen = appointmentStore(
    (state) => state.setDeleteDialogOpen
  );

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuContent
          align='end'
          className='flex flex-col'
          style={{
            position: 'absolute',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          {/* Edit */}
          <DropdownMenuItem
            className={
              appointmentStatus === 'canceled' ? 'hidden' : 'cursor-pointer'
            }
            onSelect={() => {
              setEditDialogOpen(true);
            }}
          >
            <Pencil size={16} className='me-2' />
            Editar
          </DropdownMenuItem>

          {/* Change status */}
          <DropdownMenuItem
            className={'cursor-pointer'}
            onSelect={() => {
              setChangeStatusDialogOpen(true);
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
              setDeleteDialogOpen(true);
            }}
          >
            <Trash size={16} className='me-2' />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditAppointmentDialog />
      <ChangeAppointmentStatusDialog />
      <DeleteAppointmentDialog />
    </>
  );
};
