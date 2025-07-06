export const updateAssistants = async (ids) => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch('http://localhost:3000/api/v1/assistants', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ids),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return data;
};
