import { UsersTable } from '@/components/tables/';
import { AssignAssistantDialog } from '@/components/assistants';

export const Users = () => {
  return (
    <>
      <UsersTable />
      <AssignAssistantDialog />
    </>
  );
};
