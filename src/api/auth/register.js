export const register = async (data) => {
  const res = await fetch('http://localhost:3000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw {
      status: res.status,
    };
  }

  return await res.json();
};
