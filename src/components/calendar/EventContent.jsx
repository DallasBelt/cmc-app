import { cn } from '@/lib/utils';

export const EventContent = ({ eventInfo }) => {
  const isCanceled = eventInfo.event.extendedProps.status === 'canceled';

  return (
    <div className={cn('flex flex-col', isCanceled && 'line-through')}>
      <span className='font-bold'>{eventInfo.event.title}</span>
      <span className='italic'>{eventInfo.timeText}</span>
      <span className='italic'>{eventInfo.event.extendedProps.reason}</span>
    </div>
  );
};
