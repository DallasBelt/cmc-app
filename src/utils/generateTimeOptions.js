export function generateTimeOptions(
  startHour = 6,
  endHour = 20,
  stepMinutes = 15,
  minTime = null
) {
  const times = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += stepMinutes) {
      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const time = `${formattedHour}:${formattedMinutes}`;

      if (hour === endHour && minutes > 0) continue;
      times.push(time);
    }
  }

  if (!minTime) return times;

  return times.filter((time) => {
    return time > minTime;
  });
}
