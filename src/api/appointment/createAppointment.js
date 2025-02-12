export const createAppointment = async (appointment) => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch('http://localhost:3000/api/v1/appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointment),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al crear la cita.');
  }

  const data = await res.json();

  return data;
};
