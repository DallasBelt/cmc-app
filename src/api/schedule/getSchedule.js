export const getSchedule = async () => {
  const res = await fetch('http://localhost:3000/api/v1/schedule', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data;
};
