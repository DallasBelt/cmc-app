import { useEffect, useState, useMemo } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui';

import { DataTable } from '@/components/tables';
import { assistantsColumns } from '@/config';
import { useAssistants } from '@/hooks';
import { useAssistantStore } from '@/store';

export const AssistantsTable = () => {
  const {
    assistantsQuery,
    assistantsByMedicQuery,
    availableAssistantsQuery,
    updateAssistantsMutation,
  } = useAssistants();

  // Extract available assistants (not assigned)
  const availableAssistants = useMemo(
    () => (Array.isArray(availableAssistantsQuery?.data) ? availableAssistantsQuery.data : []),
    [availableAssistantsQuery?.data]
  );

  // Extract assistants assigned to the medic (from AssistantInfo object, get the user)
  const medicAssistants = useMemo(
    () => (Array.isArray(assistantsByMedicQuery?.data) ? assistantsByMedicQuery.data : []),
    [assistantsByMedicQuery?.data]
  );
  const medicAssistantsUsers = useMemo(
    () => medicAssistants.map((a) => a.user).filter(Boolean),
    [medicAssistants]
  );

  // Combine assigned + available assistants without duplicates
  const combinedAssistants = useMemo(() => {
    const assignedIds = new Set(medicAssistantsUsers.map((a) => a.id));
    return [...medicAssistantsUsers, ...availableAssistants.filter((a) => !assignedIds.has(a.id))];
  }, [medicAssistantsUsers, availableAssistants]);

  // State for row selection (checkboxes)
  const [rowSelection, setRowSelection] = useState({});
  const { medicId } = useAssistantStore();

  // Global filter function for search input
  const globalFilterFn = (row, columnId, filterValue) => {
    const email = row.getValue('email') || '';
    return email.toLowerCase().includes(filterValue.toLowerCase());
  };

  // Handler for the assign button click
  const handleAssignClick = () => {
    const selectedIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
    const currentAssignedIds = medicAssistantsUsers.map((a) => a.id);

    if (!currentAssignedIds.length && !selectedIds.length) {
      toast.warning('Debe seleccionar al menos un asistente.');
      return;
    }

    const areSame =
      selectedIds.length === currentAssignedIds.length &&
      selectedIds.every((id) => currentAssignedIds.includes(id));

    if (areSame) {
      toast.info('No se detectaron cambios.');
      return;
    }

    updateAssistantsMutation.mutate({
      medicId,
      assistantIds: selectedIds,
    });
  };

  // Update row selection state whenever assigned assistants change
  useEffect(() => {
    if (medicAssistantsUsers.length > 0) {
      const selected = {};
      medicAssistantsUsers.forEach((user) => {
        if (user.id) {
          selected[user.id] = true;
        }
      });
      setRowSelection(selected);
    } else {
      setRowSelection({});
    }
  }, [medicAssistantsUsers]);

  // Show loading spinner while any query is pending
  if (
    assistantsQuery.isPending ||
    availableAssistantsQuery.isPending ||
    assistantsByMedicQuery.isPending
  ) {
    return (
      <div className='h-96 flex justify-center items-center'>
        <Loader2 size={50} className='animate-spin' />
      </div>
    );
  }

  // Render the data table and assign button
  return (
    <>
      <DataTable
        columns={assistantsColumns}
        data={combinedAssistants}
        globalFilterFn={globalFilterFn}
        defaultSort={[{ id: 'email', desc: false }]}
        enableRowSelection={true}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      <div className='flex md:justify-center'>
        <Button
          className='mt-5 w-full md:w-fit'
          type='submit'
          disabled={assistantsByMedicQuery.isPending}
          onClick={handleAssignClick}
        >
          {assistantsByMedicQuery.isPending && <Loader2 className='me-2 animate-spin' />}
          Actualizar
        </Button>
      </div>
    </>
  );
};
