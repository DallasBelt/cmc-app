export const changeRole = async ({ email, role }) => {
  console.log(email, role);
  const res = await fetch('http://localhost:3000/api/v1/auth/change-role', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, role }),
  });

  if (!res.ok) {
    throw new Error();
  }
};
