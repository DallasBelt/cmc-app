import { addMinutes, formatISO, set } from 'date-fns';

const weekdayMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * Generates background events that mark **unavailable time slots**
 * in FullCalendar, based on the doctor's working schedule.
 *
 * @param {Array} schedule - Doctor's weekly schedule from Supabase
 * @returns {Array} FullCalendar background events (display: 'background')
 */
export function generateUnavailableBlocks(schedule) {
  const blocks = [];

  const now = new Date();

  // Get the date of the **first day of the week** (Sunday by default)
  const startWeek = now.getDate() - now.getDay();

  // Loop through each day of the week (Sunday to Saturday)
  for (let i = 0; i < 7; i++) {
    const day = new Date(now);
    day.setDate(startWeek + i);
    const dow = day.getDay();

    // Find shifts scheduled for this specific day
    const allowedShifts = schedule.flatMap((s) =>
      s.shifts.filter((shift) => shift.days.map((d) => weekdayMap[d.toLowerCase()]).includes(dow))
    );

    if (allowedShifts.length === 0) {
      // No shifts → block entire day
      const start = set(day, { hours: 0, minutes: 0 });
      const end = set(day, { hours: 23, minutes: 59 });

      blocks.push({
        start: formatISO(start),
        end: formatISO(end),
        display: 'background',
        classNames: ['fc-slot-disabled'],
      });

      continue;
    }

    // If shifts exist → block outside the shift hours
    allowedShifts.forEach((shift) => {
      const checkIn = shift.checkIn.split(':').map(Number); // [hh, mm]
      const checkOut = shift.checkOut.split(':').map(Number); // [hh, mm]

      const startDay = set(day, { hours: 0, minutes: 0 });
      const shiftStart = set(day, {
        hours: checkIn[0],
        minutes: checkIn[1],
      });
      const shiftEnd = set(day, {
        hours: checkOut[0],
        minutes: checkOut[1],
      });
      const endDay = set(day, { hours: 23, minutes: 59 });

      // Block before the shift
      if (shiftStart > startDay) {
        blocks.push({
          start: formatISO(startDay),
          end: formatISO(addMinutes(shiftStart, -1)), // Ends right before shift
          display: 'background',
          classNames: ['fc-slot-disabled'],
        });
      }

      // Block after the shift
      if (shiftEnd < endDay) {
        blocks.push({
          start: formatISO(shiftEnd),
          end: formatISO(endDay),
          display: 'background',
          classNames: ['fc-slot-disabled'],
        });
      }
    });
  }

  return blocks;
}
