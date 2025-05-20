export const createSchedule = async (schedule) => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch('http://localhost:3000/api/v1/schedules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(schedule),
  });

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(`${res.status} (${res.statusText}).`);
  }

  // Convert to JSON
  return await res.json();
};
