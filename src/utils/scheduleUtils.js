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
          shift.days.map((day) => weekdayMap[day.toLowerCase()])
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

// Min hour in the calendar
export function getSlotMinTime(schedule) {
  const checkIns = schedule.flatMap((s) =>
    s.shifts.map((shift) => shift.checkIn)
  );
  return checkIns.sort()[0] || '07:00';
}

// Max hour in the calendar
export function getSlotMaxTime(schedule) {
  const checkOuts = schedule.flatMap((s) =>
    s.shifts.map((shift) => shift.checkOut)
  );
  return checkOuts.sort().reverse()[0] || '19:30';
}

// Check if click is valid
export function isAllowedClick(schedule, date) {
  const day = date.getDay(); // 0–6
  const time = date.toTimeString().slice(0, 5); // "HH:mm"

  return schedule.some((s) =>
    s.shifts.some((shift) => {
      const allowedDays = shift.days.map((d) => weekdayMap[d.toLowerCase()]);
      return (
        allowedDays.includes(day) &&
        time >= shift.checkIn &&
        time < shift.checkOut
      );
    })
  );
}
