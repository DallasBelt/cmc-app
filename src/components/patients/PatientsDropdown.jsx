import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ClipboardList, Ellipsis, Pencil, Trash } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';

import { DeletePatientDialog, EditPatientDialog } from '@/components/patients';

import { usePatientStore } from '@/store';

export const PatientsDropdown = ({ row }) => {
  const navigate = useNavigate();
  const { setIsEditingPatient, setPatientData } = usePatientStore();

  const isAssistant = sessionStorage.getItem('role') === 'assistant';
  const patient = row.original;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <Ellipsis size={24} className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='flex flex-col select-none'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!isAssistant && (
            <DropdownMenuItem
              onSelect={() => {
                setPatientData(patient);
                navigate(`/records/${patient.id}`);
              }}
            >
              <ClipboardList size={16} className='me-2' />
              Ver historial
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onSelect={() => {
              setEditDialogOpen(true);
              setIsEditingPatient(true);
              setPatientData(patient);
            }}
          >
            <Pencil size={16} className='me-2' /> Editar
          </DropdownMenuItem>

          {!isAssistant && (
            <DropdownMenuItem
              onSelect={() => {
                setDeleteDialogOpen(true);
              }}
            >
              <Trash size={16} className='me-2' /> Eliminar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPatientDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />

      <DeletePatientDialog row={row} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </>
  );
};

PatientsDropdown.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
