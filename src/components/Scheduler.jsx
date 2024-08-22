import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export function Scheduler() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        allDaySlot={false}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        weekends={true}
        events={[
          { title: 'event 1', date: new Date() },
          { title: 'event 2', date: new Date() },
        ]}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <div className='flex flex-col'>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
