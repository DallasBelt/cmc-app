import { DataTable } from '@/components/tables';
import { patientsColumns } from '@/config/patientsColumns';

export const PatientsTable = ({ data }) => {
  const globalFilterFn = (row, columnId, filterValue) => {
    const dni = row.getValue('dni') || '';
    const firstName = row.getValue('firstName') || '';
    const lastName = row.getValue('lastName') || '';
    return (
      dni.includes(filterValue) ||
      firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
      lastName.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  return (
    <DataTable
      columns={patientsColumns}
      data={data}
      globalFilterFn={globalFilterFn}
      defaultSort={[{ id: 'lastName', desc: false }]}
    />
  );
};
