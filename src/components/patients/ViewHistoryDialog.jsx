import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const ViewHistoryDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Historial clínico</DialogTitle>
          <DialogDescription>Description.</DialogDescription>
        </DialogHeader>
        {/* todo: historial clínico modal content */}
      </DialogContent>
    </Dialog>
  );
};
