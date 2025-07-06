import { set, addMinutes, format } from 'date-fns';

// Days map for FullCalendar (0 = sunday, ..., 6 = saturday)
const weekdayMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

// Hidden days in the calendar
export function getHiddenDays(schedule) {
  const allDays = [0, 1, 2, 3, 4, 5, 6];

  const allowedDays = Array.from(
    new Set(
      schedule.flatMap((s) =>
        s.shifts.flatMap((shift) =>
          shift.days
            .map((day) => weekdayMap[day?.toLowerCase()])
            .filter((dayNum) => Number.isInteger(dayNum))
        )
      )
    )
  );

  return allDays.filter((d) => !allowedDays.includes(d));
}

// Available times in 30 minutes intervals
export function getAvailableTimes(schedule) {
  const times = schedule.flatMap((s) =>
    s.shifts.flatMap((shift) => {
      const [startHour, startMin] = shift.checkIn.split(':').map(Number);
      const [endHour, endMin] = shift.checkOut.split(':').map(Number);

      const slots = [];
      let current = new Date();
      current.setHours(startHour, startMin, 0, 0);

      const end = new Date();
      end.setHours(endHour, endMin, 0, 0);

      while (current <= end) {
        const hh = current.getHours().toString().padStart(2, '0');
        const mm = current.getMinutes().toString().padStart(2, '0');
        slots.push(`${hh}:${mm}`);
        current.setMinutes(current.getMinutes() + 15);
      }

      return slots;
    })
  );

  // Delete duplicates and sort
  return Array.from(new Set(times)).sort();
}

// Available times per working day
export function getAvailableTimesForDay(schedule, date) {
  const weekday = date.getDay(); // 0 (Sun) - 6 (Sat)

  const shifts = schedule.flatMap((s) =>
    s.shifts.filter((shift) =>
      shift.days.some((d) => {
        const dayNum = {
          sunday: 0,
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6,
        }[d.toLowerCase()];
        return dayNum === weekday;
      })
    )
  );

  const times = new Set();

  for (const shift of shifts) {
    const [startHour, startMin] = shift.checkIn.split(':').map(Number);
    const [endHour, endMin] = shift.checkOut.split(':').map(Number);

    let time = set(date, { hours: startHour, minutes: startMin, seconds: 0 });
    const shiftEnd = set(date, { hours: endHour, minutes: endMin, seconds: 0 });

    // Add slots every 15 minutes from checkIn to checkOut
    while (time < shiftEnd) {
      times.add(format(time, 'HH:mm'));
      time = addMinutes(time, 15);
    }

    // Also include the exact checkOut time as valid endTime
    times.add(format(shiftEnd, 'HH:mm'));
  }

  return Array.from(times).sort();
}

// Min hour in the calendar
export function getSlotMinTime(schedule) {
  const checkIns = schedule.flatMap((s) => s.shifts.map((shift) => shift.checkIn));
  return checkIns.sort()[0] || '07:00';
}

// Max hour in the calendar
export function getSlotMaxTime(schedule) {
  const checkOuts = schedule.flatMap((s) => s.shifts.map((shift) => shift.checkOut));

  const latest = checkOuts.sort().reverse()[0] || '19:30';

  // Sumar 15 minutos para que se dibuje la fila final
  const [hour, minute] = latest.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute + 15, 0, 0);

  // Asegurar formato HH:mm
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');

  return `${hh}:${mm}`;
}

// Check if click is valid
export function isAllowedClick(schedule, date) {
  const day = date.getDay(); // 0–6
  const time = date.toTimeString().slice(0, 5); // "HH:mm"

  return schedule.some((s) =>
    s.shifts.some((shift) => {
      const allowedDays = shift.days.map((d) => weekdayMap[d.toLowerCase()]);
      return allowedDays.includes(day) && time >= shift.checkIn && time < shift.checkOut;
    })
  );
}
