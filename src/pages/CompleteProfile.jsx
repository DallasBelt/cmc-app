import { toast } from 'sonner';

import { Profile } from '@/pages';
import { useToastStore } from '@/store';

export const CompleteProfile = () => {
  const { showToast, toastMessage, setToast } = useToastStore();
  if (showToast) {
    toast.warning(toastMessage);
    setToast(false, '');
  }
  return <Profile />;
};
