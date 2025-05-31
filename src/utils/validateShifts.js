// Compare two day arrays regardless of order
export const areDaysEqual = (a = [], b = []) => {
  const sortedA = [...a].sort().join(',');
  const sortedB = [...b].sort().join(',');
  return sortedA === sortedB;
};

export const validateShifts = (shifts) => {
  if (!Array.isArray(shifts) || shifts.length === 0) {
    return { hasDuplicateShifts: false, hasOverlappedShifts: false };
  }

  const seenKeys = new Set();
  const normalizedShifts = [];
  let hasDuplicateShifts = false;

  for (const shift of shifts) {
    const sortedDays = [...(shift.days || [])].sort();
    const key = `${shift.checkIn}|${shift.checkOut}|${sortedDays.join(',')}`;

    if (seenKeys.has(key)) {
      hasDuplicateShifts = true;
    } else {
      seenKeys.add(key);
      normalizedShifts.push({
        checkIn: shift.checkIn,
        checkOut: shift.checkOut,
        days: sortedDays,
      });
    }
  }

  const hasOverlappedShifts = normalizedShifts.some((a, i) =>
    normalizedShifts.slice(i + 1).some((b) => {
      const daysOverlap = a.days.some((day) => b.days.includes(day));
      const timeOverlap = a.checkIn < b.checkOut && b.checkIn < a.checkOut;
      return daysOverlap && timeOverlap;
    })
  );

  return { hasDuplicateShifts, hasOverlappedShifts };
};
