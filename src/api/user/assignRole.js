export const assignRole = async ({ email, role }) => {
  const res = await fetch('http://localhost:3000/api/v1/auth/assign-role', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, role }),
  });

  const data = await res.json();

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(data?.message);
  }

  // Convert to JSON
  return await data;
};
