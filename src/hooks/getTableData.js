import { useState, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'sonner';

export const getTableData = (endpoint, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          toast.error('Oops!', {
            description: `Error de autenticación.`,
          });
          setLoading(false);
          return;
        }

        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data, endpoint, token]);

  return { data, loading };
};
