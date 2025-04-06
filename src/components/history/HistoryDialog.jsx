import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  HistoryForm,
} from '@/components';

export const HistoryDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <HistoryForm />
      </DialogContent>
    </Dialog>
  );
};
