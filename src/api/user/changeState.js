export const changeState = async (email) => {
  const res = await fetch('http://localhost:3000/api/v1/auth/soft-delete', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error();
  }
};
