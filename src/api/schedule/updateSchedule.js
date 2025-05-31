export const updateSchedule = async ({ id, shifts }) => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Authentication error.');

  const res = await fetch(`http://localhost:3000/api/v1/schedule/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shifts }),
  });

  const data = await res.json();

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(`${res.status} ${data.message}`);
  }

  // Convert to JSON
  return data;
};
