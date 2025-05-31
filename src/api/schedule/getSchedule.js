export const getSchedule = async () => {
  const res = await fetch('http://localhost:3000/api/v1/schedule', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(`${res.status} (${res.statusText}).`);
  }

  // Convert to JSON
  return await res.json();
};
