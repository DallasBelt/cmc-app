export const getAppointments = async () => {
  const token = sessionStorage.getItem('token');

  const res = await fetch('http://localhost:3000/api/v1/appointment', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Request error: ${res.statusText}`);
  }

  return await res.json();
};
