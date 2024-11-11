import { CalendarCheck2, Pencil, Trash, X } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { EditAppointmentDialog } from '@/components/EditAppointmentDialog';
import { ChangeAppointmentStatusDialog } from '@/components/ChangeAppointmentStatusDialog';
import { DeleteAppointmentDialog } from '@/components/DeleteAppointmentDialog';

import { useAppointmentStore } from '@/store/useAppointmentStore';

export const AppointmentDropdown = () => {
  const dropdownOpen = useAppointmentStore((state) => state.dropdownOpen);
  const setDropdownOpen = useAppointmentStore((state) => state.setDropdownOpen);
  const dropdownPosition = useAppointmentStore(
    (state) => state.dropdownPosition
  );

  const appointmentStatus = useAppointmentStore(
    (state) => state.appointmentStatus
  );

  const setEditDialogOpen = useAppointmentStore(
    (state) => state.setEditDialogOpen
  );

  const setChangeStatusDialogOpen = useAppointmentStore(
    (state) => state.setChangeStatusDialogOpen
  );

  const setDeleteDialogOpen = useAppointmentStore(
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
