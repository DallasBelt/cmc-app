import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/';

import { AssistantsTable } from '../tables';
import { useAssistantStore } from '@/store';

export const AssignAssistantDialog = () => {
  const { dialogOpen, setDialogOpen } = useAssistantStore();

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className='max-w-xl max-h-screen overflow-y-auto'
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className='text-xl'>Asistentes</DialogTitle>
          </DialogHeader>
          <AssistantsTable />
        </DialogContent>
      </Dialog>
    </>
  );
};
