import { UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
