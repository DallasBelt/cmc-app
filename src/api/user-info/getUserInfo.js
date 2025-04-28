export const getUserInfo = async () => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch('http://localhost:3000/api/v1/user-info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  // Convert to JSON
  return await res.json();
};
