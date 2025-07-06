export const createUserInfo = async (userInfo) => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch('http://localhost:3000/api/v1/user-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Error al crear userInfo');
  }

  return data;
};
