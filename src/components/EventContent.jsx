export const EventContent = ({ eventInfo }) => {
  const isCanceled = eventInfo.event.extendedProps.status === 'canceled';

  return (
    <span className={isCanceled ? 'font-bold line-through' : 'font-bold'}>
      {eventInfo.event.title}
    </span>
  );
};
