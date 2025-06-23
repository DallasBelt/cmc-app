export const getPatients = async () => {
  const res = await fetch('http://localhost:3000/api/v1/patient', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(data?.message);
  }

  // Convert to JSON
  return await data;
};
