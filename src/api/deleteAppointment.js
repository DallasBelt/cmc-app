export const deleteAppointment = async (appointmentId) => {
  const token = sessionStorage.getItem('token');

  const res = await fetch(
    `http://localhost:3000/api/v1/appointment/${appointmentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Request error: ${res.statusText}`);
  }
};
