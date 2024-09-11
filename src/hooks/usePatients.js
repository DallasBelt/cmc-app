import { useEffect, useState } from 'react';

export const getPatients = async () => {
  try {
    // HTTP request
    const response = await fetch('http://localhost:3000/api/v1/patient', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });

    // Check for HTTP response errors
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Convert to JSON
    const data = await response.json();
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
    getPatients().then((data) => {
      setPatients(data.data);
      setLoading(false);
    });
  }, [getPatients]);

  return { patients, loading };
};
