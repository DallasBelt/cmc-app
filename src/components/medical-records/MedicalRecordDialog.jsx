import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

import { MedicalRecordForm } from '@/components/medical-records';
import { useMedicalRecordStore } from '@/store/useMedicalRecordStore';

export const MedicalRecordDialog = () => {
  const { dialogOpen, setDialogOpen } = useMedicalRecordStore();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent
        aria-describedby={undefined}
        className='max-w-4xl max-h-[80%] overflow-y-auto select-none'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-3xl'>Historia Clínica</DialogTitle>
        </DialogHeader>
        <MedicalRecordForm />
      </DialogContent>
    </Dialog>
  );
};
