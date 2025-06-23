export const login = async (credentials) => {
  const res = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  // Check for HTTP response errors
  if (!res.ok) {
    throw new Error(data?.message);
  }

  // Convert to JSON
  return await data;
};
