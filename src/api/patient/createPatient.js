export const createPatient = async (patient) => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch('http://localhost:3000/api/v1/patient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patient),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al crear paciente.');
  }

  const data = await res.json();

  return data;
};
