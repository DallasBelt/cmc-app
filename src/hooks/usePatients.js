import { useEffect, useState } from 'react';

export const fetchData = async () => {
  try {
    // HTTP request
    const res = await fetch('http://localhost:3000/api/v1/patient', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });

    // Check for HTTP response errors
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    // Convert to JSON
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then((data) => {
      setPatients(data.data);
      setLoading(false);
    });
  }, [fetchData]);

  return { patients, loading };
};
