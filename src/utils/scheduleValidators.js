// export const hasDuplicateSchedules = (schedules) => {
//   const seen = new Set();
//   for (const s of schedules) {
//     const key = `${s.checkIn}|${s.checkOut}|${[...s.days].sort().join(',')}`;
//     if (seen.has(key)) return true;
//     seen.add(key);
//   }
//   return false;
// };

// export const hasOverlappingSchedules = (schedules) => {
//   for (let i = 0; i < schedules.length; i++) {
//     for (let j = i + 1; j < schedules.length; j++) {
//       const a = schedules[i];
//       const b = schedules[j];
//       const daysOverlap = a.days.some((day) => b.days.includes(day));
//       const timeOverlap = a.checkIn < b.checkOut && b.checkIn < a.checkOut;
//       if (daysOverlap && timeOverlap) return true;
//     }
//   }
//   return false;
// };

// export function isScheduleAllowed(newSchedule, existingSchedules) {
//   const allSchedules = [...existingSchedules, newSchedule];
//   return (
//     !hasDuplicateSchedules(allSchedules) &&
//     !hasOverlappingSchedules(allSchedules)
//   );
// }

export function getScheduleIssues(schedules) {
  const seen = new Set();
  let hasDuplicates = false;
  const filteredForOverlap = [];

  for (const s of schedules) {
    const key = `${s.checkIn}|${s.checkOut}|${[...s.days].sort().join(',')}`;
    if (seen.has(key)) {
      hasDuplicates = true;
    } else {
      seen.add(key);
      filteredForOverlap.push(s);
    }
  }

  let hasOverlaps = false;
  for (let i = 0; i < filteredForOverlap.length; i++) {
    for (let j = i + 1; j < filteredForOverlap.length; j++) {
      const a = filteredForOverlap[i];
      const b = filteredForOverlap[j];
      const daysOverlap = a.days.some((day) => b.days.includes(day));
      const timeOverlap = a.checkIn < b.checkOut && b.checkIn < a.checkOut;
      if (daysOverlap && timeOverlap) {
        hasOverlaps = true;
        break;
      }
    }
    if (hasOverlaps) break;
  }

  return { hasDuplicates, hasOverlaps };
}
