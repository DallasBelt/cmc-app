import { DataTable } from '@/components/tables';
import { usersColumns } from '@/config/usersColumns';

export const UsersTable = ({ data }) => {
  const globalFilterFn = (row, columnId, filterValue) => {
    const email = row.getValue('email') || '';
    return email.toLowerCase().includes(filterValue.toLowerCase());
  };

  return (
    <DataTable
      columns={usersColumns}
      data={data}
      globalFilterFn={globalFilterFn}
      defaultSort={[{ id: 'email', desc: false }]}
    />
  );
};
