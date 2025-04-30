export const completeProfile = async () => {
  const token = sessionStorage.getItem('token');
  if (!token) throw new Error('Error de autenticación.');

  const res = await fetch(
    'http://localhost:3000/api/v1/auth/complete-profile',
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error('Error al marcar el perfil como completo.');
  return await res.json();
};
