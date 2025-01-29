export const changeAppointmentStatus = async ({
  appointmentId,
  appointmentStatus,
}) => {
  const token = sessionStorage.getItem('token');

  const newAppointmentStatus =
    appointmentStatus === 'pending' ? 'canceled' : 'pending';

  const res = await fetch(
    `http://localhost:3000/api/v1/appointment/${appointmentId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newAppointmentStatus }),
    }
  );

  if (!res.ok) {
    throw new Error(`Request error: ${res.statusText}`);
  }

  return newAppointmentStatus;
};
