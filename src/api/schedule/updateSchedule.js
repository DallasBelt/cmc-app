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

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data;
};
