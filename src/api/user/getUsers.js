export const getUsers = async () => {
  const res = await fetch('http://localhost:3000/api/v1/auth/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Request error: ${res.statusText}`);
  }

  return await res.json();
};
