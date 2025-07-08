import PropTypes from 'prop-types';
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

EventContent.propTypes = {
  eventInfo: PropTypes.shape({
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      extendedProps: PropTypes.shape({
        status: PropTypes.string,
        reason: PropTypes.string,
      }),
    }),
    timeText: PropTypes.string.isRequired,
  }).isRequired,
};
