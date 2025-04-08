import { useState } from 'react';

import { ClipboardList, Ellipsis, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  DeletePatientDialog,
  EditPatientDialog,
  ViewMedicalRecordDialog,
} from '@/components';
import { usePatientStore } from '@/store';
import { set } from 'date-fns';

export const PatientsDropdown = ({ row }) => {
  const isAssistant = sessionStorage.getItem('roles').includes('assistant');

  const [medicalRecordDialogOpen, setMedicalRecordDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const setIsEditingPatient = usePatientStore(
    (state) => state.setIsEditingPatient
  );
  const setPatientData = usePatientStore((state) => state.setPatientData);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <Ellipsis size={24} className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='flex flex-col'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAssistant ? (
            ''
          ) : (
            <DropdownMenuItem onSelect={() => setMedicalRecordDialogOpen(true)}>
              <ClipboardList size={16} className='me-2' />
              Ver historial
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onSelect={() => {
              setEditDialogOpen(true);
              setIsEditingPatient(true);
              setPatientData(row.original);
            }}
          >
            <Pencil size={16} className='me-2' /> Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              setDeleteDialogOpen(true);
            }}
          >
            <Trash size={16} className='me-2' /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewMedicalRecordDialog
        open={medicalRecordDialogOpen}
        onOpenChange={setMedicalRecordDialogOpen}
      />

      <EditPatientDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      <DeletePatientDialog
        row={row}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
};
