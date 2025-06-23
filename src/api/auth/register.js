export const register = async (credentials) => {
  const res = await fetch('http://localhost:3000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message);
  }

  return await data;
};
